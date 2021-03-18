import React from "react";
import PropTypes from "prop-types";
import RawButton from "@paprika/raw-button";
import { isActiveElementPopover } from "../../helpers/isActiveElementPopover";
import PopoverContext from "../../PopoverContext";
import * as sc from "../../Popover.styles";

const propTypes = {
  /** Descriptive a11y text for assistive technologies for the trigger. */
  a11yText: PropTypes.string,

  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]).isRequired,
};

const defaultProps = {
  a11yText: null,
};

function Trigger(props) {
  const {
    content,
    isEager,
    isOpen,
    onClick,
    onClose,
    onDelayedClose,
    onDelayedOpen,
    onOpen,
    shouldKeepFocus,
  } = React.useContext(PopoverContext);

  function handleTriggerEvent(event) {
    if (isEager && (event.type === "mouseover" || event.type === "focus")) {
      if (event.type === "mouseover") {
        onDelayedOpen();
      } else {
        onOpen();
      }
    } else if (isEager && event.type === "mouseout") {
      onDelayedClose();
    } else if ((shouldKeepFocus || isEager) && event.type === "blur") {
      window.requestAnimationFrame(() => {
        if (!isActiveElementPopover()) onClose();
      });
    } else if (event.type === "click" || event.key === " " || event.key === "Enter") {
      onClick(event);
    }
  }

  const { children, a11yText, ...moreProps } = props;

  if (typeof children === "function") {
    const a11yAttributes = { "aria-describedby": content.ariaId, "aria-haspopup": true };
    return React.cloneElement(children(handleTriggerEvent, a11yAttributes, isOpen), {
      ...moreProps,
    });
  }

  const commonAttributes = {
    a11yText,
    "aria-haspopup": true,
    "data-pka-anchor": "popover.trigger",
  };

  if (isEager) {
    return (
      <sc.Trigger
        {...commonAttributes}
        onMouseOver={handleTriggerEvent}
        onMouseOut={handleTriggerEvent}
        onFocus={handleTriggerEvent}
        onBlur={handleTriggerEvent}
        aria-describedby={content.ariaId}
        {...moreProps}
      >
        {children}
      </sc.Trigger>
    );
  }

  return (
    <RawButton
      {...commonAttributes}
      onClick={handleTriggerEvent}
      onBlur={shouldKeepFocus ? handleTriggerEvent : null}
      {...moreProps}
    >
      {children}
    </RawButton>
  );
}

Trigger.displayName = "Popover.Trigger";

Trigger.propTypes = propTypes;
Trigger.defaultProps = defaultProps;

export default Trigger;
