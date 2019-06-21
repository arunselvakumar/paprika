import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import momentPropTypes from "react-moment-proptypes";

import CalendarIcon from "@paprika/icon/lib/Calendar";
import Input from "@paprika/input";
import Popover from "@paprika/popover";
import useI18n from "@paprika/l10n/lib/useI18n";
import useDebounce from "@paprika/helpers/lib/hooks/useDebounce";
import isElementContainsFocus from "@paprika/helpers/lib/dom/isElementContainsFocus";

import Calendar from "./components/Calendar";
import DateInput from "./components/DateInput";

import { CalendarStyles } from "./DatePicker.styles";
import { extractChildrenProps } from "./helpers";

const propTypes = {
  children: PropTypes.node,

  /** Date format used while entering and parsing user input. */
  dataFormat: PropTypes.string,

  /** Selected date in moment object. */
  date: momentPropTypes.momentObj,

  /** Date format used while displaying date. It should be human-friendly and spelled out. */
  humanFormat: PropTypes.string,

  /** Should be disabled or not, default is false. */
  isDisabled: PropTypes.bool,

  /** Should be read-only or not, default is false. */
  isReadOnly: PropTypes.bool,

  /** Callback when date is selected or input. */
  onChange: PropTypes.func.isRequired,
};

const defaultProps = {
  children: null,
  dataFormat: "MM/DD/YYYY",
  date: null,
  humanFormat: undefined,
  isDisabled: false,
  isReadOnly: false,
};

function DatePicker(props) {
  const I18n = useI18n();

  // Props
  const {
    children,
    dataFormat,
    date,
    humanFormat = I18n.t("datePicker.confirmation_format"),
    isDisabled,
    isReadOnly,
    onChange,
  } = props;

  function formatDateProp(format) {
    return date && date.isValid() ? moment.utc(date).format(format) : "";
  }

  // State
  const [confirmationResult, setConfirmationResult] = React.useState(formatDateProp(humanFormat));
  const [hasError, setHasError] = React.useState(false);
  const [inputtedString, setInputtedString] = React.useState(formatDateProp(dataFormat));
  const [possibleDate, setPossibleDate] = React.useState(null);
  const [shouldShowCalendar, setShouldShowCalendar] = React.useState(false);

  // Ref
  const calendarRef = React.useRef(null);
  const inputRef = React.useRef(null);

  // Effect
  React.useEffect(() => {
    setInputtedString(formatDateProp(dataFormat));
    setConfirmationResult(formatDateProp(humanFormat));
  }, [date]);

  const debouncedPossibleDate = useDebounce(possibleDate, 300);
  const extendedInputProps = extractChildrenProps(children);

  function hideCalendar() {
    if (shouldShowCalendar) setShouldShowCalendar(false);
    inputRef.current.blur();
  }

  function showCalendar() {
    if (!shouldShowCalendar) setShouldShowCalendar(true);
  }

  function parseInput() {
    let newDate = moment.utc(inputtedString, dataFormat);

    if (!newDate.isValid()) newDate = moment.utc(inputtedString);

    return newDate;
  }

  function handleChange(newDate) {
    if (date !== newDate) onChange(newDate);
  }

  function handleClick() {
    if (!isReadOnly) showCalendar();
  }

  function handleClosePopover() {
    if (!isElementContainsFocus(calendarRef.current) && !isElementContainsFocus(inputRef.current)) {
      if (!hasError) {
        setConfirmationResult(formatDateProp(humanFormat));
        setInputtedString(formatDateProp(dataFormat));
      }
      hideCalendar();
    }
  }

  function handleFocusInput() {
    if (!isReadOnly) setConfirmationResult("");
  }

  function handleReset() {
    setHasError(false);
    setInputtedString("");
    handleChange(null);
  }

  function handleInputConfirm() {
    hideCalendar();

    if (!inputtedString) {
      handleReset();
      return;
    }

    const newDate = parseInput();

    if (newDate.isValid()) {
      setConfirmationResult(newDate.format(humanFormat));
      setHasError(false);
      if (!moment(newDate).isSame(date, "day")) handleChange(newDate);
    } else {
      setConfirmationResult("");
      setHasError(true);
    }
  }

  function handleInputBlur() {
    window.requestAnimationFrame(() => {
      if (!isElementContainsFocus(calendarRef.current)) {
        handleInputConfirm();
      }
    });
  }

  function handleInputChange(e) {
    setInputtedString(e.target.value);
  }

  function handleKeyUp(event) {
    if (event.key === "Enter") {
      handleInputConfirm();
    } else if (event.key === "Escape") {
      hideCalendar();
    } else {
      const updatedPossibleDate = parseInput();

      if (updatedPossibleDate.isSame(possibleDate, "year") && updatedPossibleDate.isSame(possibleDate, "month")) return;
      setPossibleDate(updatedPossibleDate);
    }
  }

  function handleResetPossibleDate() {
    setPossibleDate(null);
  }

  function handleSelect(seletedDate) {
    setHasError(false);
    setConfirmationResult(seletedDate.format(humanFormat));
    hideCalendar();
    handleChange(seletedDate);
  }

  return (
    <Popover isOpen={shouldShowCalendar} offset={8} onClose={handleClosePopover} shouldKeepFocus>
      <Input
        hasError={hasError}
        icon={<CalendarIcon />}
        isDisabled={isDisabled}
        isReadOnly={isReadOnly}
        onBlur={handleInputBlur}
        onChange={handleInputChange}
        onClick={handleClick}
        onFocus={handleFocusInput}
        onKeyUp={handleKeyUp}
        inputRef={inputRef}
        value={confirmationResult || inputtedString}
        {...extendedInputProps}
      />

      <Popover.Content>
        <div css={CalendarStyles} data-qa-anchor="datepicker.calendar" ref={calendarRef}>
          <Calendar
            date={date}
            possibleDate={debouncedPossibleDate}
            resetPossibleDate={handleResetPossibleDate}
            onSelect={handleSelect}
            isOpen={shouldShowCalendar}
          />
        </div>
      </Popover.Content>
    </Popover>
  );
}

DatePicker.displayName = "DatePicker";

DatePicker.propTypes = propTypes;
DatePicker.defaultProps = defaultProps;

DatePicker.Input = DateInput;

export default DatePicker;
