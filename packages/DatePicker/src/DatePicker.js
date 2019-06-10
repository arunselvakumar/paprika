import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import momentPropTypes from "react-moment-proptypes";

import CalendarIcon from "@paprika/icon/lib/Calendar";
import Input from "@paprika/input";
import Popover from "@paprika/popover";
import useI18n from "@paprika/l10n/lib/useI18n";

import Calendar from "./components/Calendar/Calendar";
import DateInput from "./components/DateInput/DateInput";

import { CalendarStyles } from "./DatePicker.styles";
import { getExtendedInputProps } from "./helpers";

const propTypes = {
  children: PropTypes.node,

  /** Selected date in moment object. */
  date: momentPropTypes.momentObj,

  /** Date format, will show in the date input. */
  format: PropTypes.string,

  /** Should be disabled or not, default is false. */
  isDisabled: PropTypes.bool,

  /** Should be read-only or not, default is false. */
  isReadOnly: PropTypes.bool,

  /** Callback when date is selected or input. */
  onChange: PropTypes.func.isRequired,
};

const defaultProps = {
  children: null,
  date: null,
  format: "YYYY-MM-DD",
  isDisabled: false,
  isReadOnly: false,
};

function DatePicker(props) {
  const I18n = useI18n();
  const dateFormatForConfirmation = I18n.t("dateInput.confirmation_format");
  const { children, date, format, isDisabled, isReadOnly, onChange } = props;
  const [confirmationResult, setConfirmationResult] = React.useState("");
  const [hasError, setHasError] = React.useState(false);
  const [inputtedString, setInputtedString] = React.useState(date ? moment(date).format(format) : "");
  const [shouldShowCalendar, setShouldShowCalendar] = React.useState(false);
  const extendedInputProps = getExtendedInputProps(children);

  const calendarRef = React.useRef(null);

  function showCalendar() {
    if (!shouldShowCalendar) setShouldShowCalendar(true);
  }

  function hideCalendar() {
    if (shouldShowCalendar) setShouldShowCalendar(false);
  }

  function handleChange(newDate) {
    if (date !== newDate) onChange(newDate);
  }

  function handleReset() {
    setHasError(false);
    setInputtedString("");
    handleChange(null);
  }

  function handleSelect(seletedDate) {
    setHasError(false);
    setInputtedString(moment(seletedDate).format(format));
    hideCalendar();
    handleChange(seletedDate);
  }

  function handleFocusInput() {
    setConfirmationResult("");
  }

  function handleInputChange(e) {
    setInputtedString(e.target.value);
  }

  function handleInputConfirm() {
    if (!inputtedString) {
      handleReset();
      return;
    }

    const newDate = moment(inputtedString);

    if (newDate.isValid()) {
      if (moment(newDate).isSame(date, "day")) return;

      setConfirmationResult(newDate.format(dateFormatForConfirmation));
      setHasError(false);
      handleChange(newDate);
    } else {
      setHasError(true);
    }
  }

  function handleInputBlur() {
    window.requestAnimationFrame(() => {
      if (calendarRef.current !== document.activeElement && !calendarRef.current.contains(document.activeElement)) {
        handleInputConfirm();
        hideCalendar();
      }
    });
  }

  function handleKeyUp(event) {
    if (event.key === "Enter") {
      handleInputConfirm();
      hideCalendar();
    }
  }

  function handleClick() {
    if (!isReadOnly) showCalendar();
  }

  return (
    <Popover isOpen={shouldShowCalendar} offset={8} onClose={hideCalendar} shouldKeepFocus>
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
        value={confirmationResult || inputtedString}
        {...extendedInputProps}
      />

      <Popover.Content>
        <div css={CalendarStyles} ref={calendarRef}>
          <Calendar date={date} onSelect={handleSelect} />
        </div>
      </Popover.Content>
    </Popover>
  );
}

DatePicker.displayName = "DatePicker";

DatePicker.propTypes = propTypes;
DatePicker.defaultProps = defaultProps;

DatePicker.Calendar = Calendar;
DatePicker.Input = DateInput;

export default DatePicker;
