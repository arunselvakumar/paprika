import React from "react";
import PropTypes from "prop-types";
import useStore from "@paprika/listbox/store/useStore";
import * as actionTypes from "@paprika/listbox/store/actionTypes";
import { getDOMAttributesForListBoxButton } from "@paprika/listbox/helpers/DOMAttributes";
import TriggerStyled from "./Trigger.styles";

const propTypes = {
  children: PropTypes.node.isRequired,
};

export default function Trigger(props) {
  const [state, dispatch] = useStore();
  const handleClick = () => {
    dispatch({ type: actionTypes.openPopover });
  };

  return (
    <TriggerStyled onClick={handleClick} {...getDOMAttributesForListBoxButton()} ref={state.refTrigger}>
      {props.children}
    </TriggerStyled>
  );
}

Trigger.propTypes = propTypes;