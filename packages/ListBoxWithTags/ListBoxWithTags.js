import React from "react";
import PropTypes from "prop-types";
import ListBox, { propTypes as listBoxPropTypes, defaultProps as listBoxdefaultProps } from "@paprika/listbox/ListBox";
import Option from "@paprika/listbox/components/Option";
import Group from "@paprika/listbox/components/Group";
import Provider from "@paprika/listbox/store/Provider";
import useListBox from "@paprika/listbox/store/useListBox";
import * as actionTypes from "@paprika/listbox/store/actionTypes";
import handleKeyboardKeys from "./helpers/handleKeyboardKeys";

// Custom Componeent for ListBoxWithTags
import Tags from "./components/Tags";
import Trigger from "./components/Trigger";

const propTypes = {
  ...listBoxPropTypes,
  hasCustomTags: PropTypes.bool,
  placeholderForTagInput: PropTypes.string,
  hideOptionOnSelected: PropTypes.bool,
};

const defaultProps = {
  ...listBoxdefaultProps,
  hasCustomTags: false,
  placeholderForTagInput: "New option ...",
  hideOptionOnSelected: true,
};

function ListBoxWithTags(props) {
  const refTagInput = React.useRef();
  const [state, dispatch] = useListBox();
  const [activeTag, setActiveTag] = React.useState(null);

  const renderLabel = () => {
    /* eslint-disable react/prop-types */
    return (
      <Trigger>
        <Tags
          activeTag={activeTag}
          hasCustomTags={props.hasCustomTags}
          placeholderForTagInput={props.placeholderForTagInput}
          refTagInput={refTagInput}
        />
        {!state.selectedOptions.length && !props.hasCustomTags ? state.placeholder : null}
      </Trigger>
    );
    /* eslint-enable react/prop-types */
  };

  const handleKeyDown = handleKeyboardKeys({ state, dispatch, activeTag, setActiveTag, refTagInput });

  return <ListBox onKeyDown={handleKeyDown} {...props} renderLabel={renderLabel} preventOnBlurOnTrigger />;
}

export default function ListBoxWithTagsWithProvider(props) {
  return (
    <Provider {...props} isMulti childrenListBoxOptions={props.children}>
      <ListBoxWithTags {...props} />
    </Provider>
  );
}

ListBoxWithTagsWithProvider.propTypes = propTypes;
ListBoxWithTagsWithProvider.defaultProps = defaultProps;
ListBoxWithTagsWithProvider.Option = Option;
ListBoxWithTagsWithProvider.Group = Group;
