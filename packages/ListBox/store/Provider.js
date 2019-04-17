import React from "react";
import PropTypes from "prop-types";
import reducer from "./reducer";
import handleChange from "../helpers/handleChange";
import { getDataOptions } from "../components/Option/helpers/optionState";

export const StoreContext = React.createContext();

function initializeState(props) {
  const {
    childrenOptions,
    hasGroupSelection,
    height,
    hideOptionOnSelected,
    isDisabled,
    isInlineDisplay,
    isMulti,
    isPopoverEager,
    onChange,
    onDeselected,
    onSelected,
    placeholder,
    preventOnBlurOnTrigger,
    refFilterInput,
    refFooterContainer,
    refListBox,
    refListBoxContainer,
    refTrigger,
    refTriggerContainer,
  } = props;

  // initialize state for options and groups
  const options = getDataOptions(childrenOptions);
  // const Footer = getFooter(childrenOptions);
  const selectedOptions = Object.keys(options)
    .filter(key => options[key].isSelected)
    .map(key => Number.parseInt(key, 10));

  let activeOption = null;
  if (selectedOptions.length && !props.isMulti) {
    activeOption = selectedOptions[0];
  }

  const initialState = {
    activeOption,
    filteredOptions: [],
    hasFilter: props.hasFilter,
    hasFooter: false,
    hasGroupSelection,
    hasNoResults: false,
    hasPopupOpened: false,
    height,
    hideOptionOnSelected,
    isDisabled,
    isInlineDisplay,
    isMulti,
    isPopoverEager,
    lastActiveOptionIndexAffected: null,
    onChange,
    onDeselected,
    onSelected,
    options,
    placeholder,
    preventOnBlurOnTrigger,
    refFilterInput,
    refFooterContainer,
    refListBox,
    refListBoxContainer,
    refTrigger,
    refTriggerContainer,
    renderCheckbox: props.renderCheckbox,
    selectedGroupSelectors: [],
    selectedOptions,
    shouldListBoxContentScroll: true,
    triggerWidth: 0,
  };

  handleChange(initialState, { activeOptionIndex: activeOption }, selectedOptions, "load");

  return {
    ...initialState,
    originalState: { ...initialState },
    lastKnownSelectedOptions: initialState.selectedOptions.slice(0),
  };
}

const propTypes = {
  children: PropTypes.node.isRequired,
};

export default function Provider(props) {
  const refFilterInput = React.useRef(null);
  const refFooterContainer = React.useRef(null);
  const refListBox = React.useRef(null);
  const refListBoxContainer = React.useRef(null);
  const refTrigger = React.useRef(null);
  const refTriggerContainer = React.useRef(null);

  const [state, dispatch] = React.useReducer(
    reducer,
    {
      ...props,
      refFilterInput,
      refFooterContainer,
      refListBox,
      refListBoxContainer,
      refTrigger,
      refTriggerContainer,
    },
    initializeState
  );

  const value = { state, dispatch };

  return <StoreContext.Provider value={value}>{props.children}</StoreContext.Provider>;
}

Provider.propTypes = propTypes;
