import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import momentPropTypes from "react-moment-proptypes";

import "react-dates/initialize";
import { DayPickerSingleDateController as SDPController } from "react-dates";
import "react-dates/lib/css/_datepicker.css";

import ArrowLeft from "@paprika/icon/lib/ArrowLeft";
import ArrowRight from "@paprika/icon/lib/ArrowRight";
import useI18n from "@paprika/l10n/lib/useI18n";

import CalendarStyled, { DayTriggerStyle, CalendarHeaderStyled } from "./Calendar.styles";

const propTypes = {
  /** Selected date in moment object */
  date: momentPropTypes.momentObj,

  /** Callback to fire when user select date */
  onSelect: PropTypes.func.isRequired,
};

const defaultProps = {
  date: null,
};

function Calendar(props) {
  const I18n = useI18n();

  // Props
  const { date, onSelect } = props;

  // Ref
  const nextButtonRef = React.useRef(null);
  const prevButtonRef = React.useRef(null);

  function getInitialVisibleMonth() {
    return date && date.isValid() ? date : moment();
  }

  function handleClickNavigation(buttonRef) {
    if (buttonRef.current.parentNode.tabIndex !== 0) {
      // eslint-disable-next-line no-param-reassign
      buttonRef.current.parentNode.tabIndex = 0;
    }
    buttonRef.current.parentNode.focus();
  }

  function handleClickNextMonth() {
    handleClickNavigation(nextButtonRef);
  }

  function handleClickPrevMonth() {
    handleClickNavigation(prevButtonRef);
  }

  // eslint-disable-next-line react/prop-types
  function renderMonthHeaderElement({ month }) {
    return <CalendarHeaderStyled>{month.format(I18n.t("dateInput.calendar_header_format"))}</CalendarHeaderStyled>;
  }

  function renderArrowLeft() {
    return (
      <span ref={prevButtonRef}>
        <ArrowLeft role="presentation" size="14px" />
      </span>
    );
  }

  function renderArrowRight() {
    return (
      <span ref={nextButtonRef}>
        <ArrowRight role="presentation" size="14px" />
      </span>
    );
  }

  function renderDayContents(day) {
    return (
      <span
        css={DayTriggerStyle}
        className="aclui-calendar-day-content"
        isSelected={moment(day).isSame(date, "day")}
        isToday={moment(day).isSame(moment(), "day")}
      >
        {day.format("D")}
      </span>
    );
  }

  return (
    <CalendarStyled>
      <SDPController
        key={date}
        daySize={30}
        enableOutsideDays
        hideKeyboardShortcutsPanel
        initialVisibleMonth={getInitialVisibleMonth}
        navPrev={renderArrowLeft()}
        navNext={renderArrowRight()}
        numberOfMonths={1}
        onDateChange={onSelect}
        onPrevMonthClick={handleClickPrevMonth}
        onNextMonthClick={handleClickNextMonth}
        date={date}
        focused
        renderMonthElement={renderMonthHeaderElement}
        transitionDuration={0}
        horizontalMonthPadding={0}
        renderDayContents={renderDayContents}
        verticalBorderSpacing={0}
      />
    </CalendarStyled>
  );
}

Calendar.displayName = "Calendar";

Calendar.propTypes = propTypes;
Calendar.defaultProps = defaultProps;

export default Calendar;
