import useListBox from "../../../useListBox";
import applyOnChange from "../../../helpers/applyOnChange";

function getOnChangeFn(state) {
  applyOnChange(state.onChange, "listbox:option-selected");
}

function selectSingleOption({ activeOptionIndex, isPopoverOpen, state, dispatch }) {
  dispatch({
    type: useListBox.types.selectSingleOption,
    payload: { activeOptionIndex, isPopoverOpen, onChangeFn: getOnChangeFn(state, activeOptionIndex) },
  });
}

function selectMultipleOption({ activeOptionIndex, state, dispatch }) {
  dispatch({
    type: useListBox.types.selectMultipleOption,
    payload: { activeOptionIndex, onChangeFn: getOnChangeFn(state, activeOptionIndex) },
  });
}

export function isOptionSelected(state, index) {
  return state.selectedOptions.includes(index);
}

export function isOptionVisible(state, key) {
  if (!Object.keys(state.options).length) return;

  const keyInt = Number.parseInt(key, 10);

  if (typeof state.options[keyInt] === "undefined") {
    return true;
  }

  if (state.hideOptionOnSelected && state.selectedOptions.includes(keyInt)) {
    return false;
  }

  if (state.noResultsFound) {
    return false;
  }

  if (state.options[keyInt].isHidden) {
    return false;
  }

  return !state.filteredOptions.length || state.filteredOptions.includes(keyInt);
}

function isDisabled(state, key) {
  return state.options[key].isDisabled;
}

export function getNextOptionActiveIndex(state, isAscending = true) {
  const { activeOption, filteredOptions, options } = state;
  const optionsKeys = Object.keys(state.options);

  if (state.noResultsFound) return null;
  if (state.activeOption === null) return 0;

  if (optionsKeys.length === 1) {
    return 0;
  }

  if (optionsKeys.length - 1 < activeOption) {
    return 0;
  }

  let key = state.options[activeOption].index;

  let index = null;
  let keepIterating = true;

  while (keepIterating) {
    if (isAscending) {
      if (filteredOptions.length === 1) {
        keepIterating = false;
        return filteredOptions[0];
      }

      if ((filteredOptions.length && key + 1 > options.length) || key + 1 > optionsKeys.length - 1) {
        keepIterating = false;
        return null;
      }

      key++;
    } else {
      if ((filteredOptions.length && key - 1 < 0) || key - 1 < 0) {
        keepIterating = false;
        return null;
      }

      key--;
    }

    if (isOptionVisible(state, key) && !isDisabled(state, key)) {
      index = key;
      keepIterating = false;
    }
  }

  return index || 0;
}

export function getNextOptionActiveIndexLooping(state) {
  let activeIndex = getNextOptionActiveIndex(state);
  if (!activeIndex) {
    activeIndex = getNextOptionActiveIndex(state, false);
  }

  return activeIndex;
}

export function handleArrowKeys({ event, state, dispatch, isArrowDown = null }) {
  if (!state.isPopoverOpen) {
    dispatch({ type: useListBox.types.openPopover });
    return;
  }

  event.preventDefault();
  const next = isArrowDown ? getNextOptionActiveIndex(state) : getNextOptionActiveIndex(state, false);
  if (next !== null) {
    if (state.isMulti) {
      dispatch({
        type: useListBox.types.setActiveOption,
        payload: { activeOptionIndex: next, isPopoverOpen: true },
      });
    } else {
      selectSingleOption({ activeOptionIndex: next, isPopoverOpen: true, state, dispatch });
    }
  }
}

export const handleClickOption = ({ props, state, dispatch }) => event => {
  const { index } = props;
  const { options, hasFilter, isMulti, refFilterInput } = state;

  if (state.isDisabled) {
    return;
  }

  if (state.refListBox.current.contains(event.target) && document.activeElement === document.body && !hasFilter) {
    state.refListBoxContainer.current.focus();
  }

  if (hasFilter && isMulti) {
    refFilterInput.current.focus();
  }

  if (props.onClick) {
    if (options[index].preventDefaultOnSelect) {
      // this will not selected the option though will report that was clicked it.
      state.options[index].onClick();
      return;
    }

    state.options[index].onClick();
  }

  if (isMulti) {
    selectMultipleOption({
      activeOptionIndex: index,
      state,
      dispatch,
    });

    return;
  }

  selectSingleOption({ activeOptionIndex: index, isPopoverOpen: false, state, dispatch });
};

export function handleEnterOrSpace({ event, state, dispatch }) {
  const pressedSpaceKeyWhileHavingFilter = state.hasFilter && event.key === " " && event.target.value !== "";
  const isEventOnFooter = state.refFooterContainer.current.contains(event.target);

  if (pressedSpaceKeyWhileHavingFilter || isEventOnFooter) {
    return;
  }

  event.preventDefault();

  const option = state.options[state.activeOption];

  if (option && (option.isDisabled || option.preventDefaultOnSelect)) {
    if (state.options[state.activeOption].onClick) {
      // no sure if this is the state they want
      // since haven't run the entire cycle befor executing it
      state.options[state.activeOption].onClick(event, state.activeOption, state.options, state, dispatch);
    }

    return;
  }

  if (state.activeOption === null) {
    if (state.isInline) {
      return;
    }

    if (state.noResultsFound) {
      return;
    }

    if (state.isMulti) {
      dispatch({ type: useListBox.types.togglePopover });
      return;
    }
  }

  if (state.isPopoverOpen) {
    if (state.options[state.activeOption].onClick) {
      // no sure if this is the state they want
      // since haven't run the entire cycle befor executing it
      state.options[state.activeOption].onClick(state.activeOption, state.options, state, dispatch);
    }

    if (state.isMulti) {
      selectMultipleOption({
        activeOptionIndex: state.activeOption,
        state,
        dispatch,
      });
      return;
    }

    // for single select the option is set when the user interact with up and down arrows
    // no need to notify which option is selected just close the popover
    dispatch({ type: useListBox.types.closePopover });
  } else {
    dispatch({ type: useListBox.types.openPopover });
  }
}
