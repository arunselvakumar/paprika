import React from "react";
import PropTypes from "prop-types";
import { container, flex } from "./ListBoxBrowser.styles";
import { getData, getOptionByKey, onChange as onChangeHelper, isRoot } from "./helpers";
import OptionsSelected from "./components/OptionsSelected";
import CustomListBox from "./components/CustomListBox";
import Title from "./components/Title";

const propTypes = {
  data: PropTypes.any.isRequired, // eslint-disable-line
  isMulti: PropTypes.bool,
  height: PropTypes.number,
  onChange: PropTypes.func,
  isParentSelectable: PropTypes.bool,
  rootTitle: PropTypes.string,
  browserTitle: PropTypes.string,
};

const defaultProps = {
  isMulti: true,
  height: 220,
  onChange: () => {},
  isParentSelectable: null,
  rootTitle: "",
  browserTitle: "",
};

function focusListBoxBrowser() {
  window.requestAnimationFrame(() => {
    document.querySelectorAll('[data-ppk-anchor="listbox-content-inline"]')[1].focus();
  });
}

export default function ListBoxBrowser(props) {
  const refSelectedOptions = React.useRef({});
  const { onChange, isParentSelectable, data, isMulti, height, rootTitle, browserTitle } = props;
  const [localData] = React.useState(() => getData({ data, selectedOptions: refSelectedOptions }));
  const [rootKey, setRootKey] = React.useState("0");
  // NOTE: will yield a bug if the first option has not children
  const [browserKey, setBrowserKey] = React.useState("0");
  const [selectedOptions, setSelectedOptions] = React.useState(refSelectedOptions.current);
  const browserOptions = React.useMemo(() => getOptionByKey(localData, browserKey || rootKey), [
    browserKey,
    localData,
    rootKey,
  ]);

  const handleChange = source => (indexes, list) => {
    onChangeHelper({
      source,
      indexes,
      list,
      isParentSelectable,
      setSelectedOptions,
      browserKey,
      isMulti,
    });
  };

  const handleClickRoot = ({ $$key, hasOptions, isClickFromButton = false }) => event => {
    if ((hasOptions && isParentSelectable === null) || isClickFromButton) {
      setRootKey($$key);
      setBrowserKey($$key);
      focusListBoxBrowser();
      if (event) event.stopPropagation();
    }
  };

  const handleClickBrowser = ({ $$key, isClickFromButton = false }) => event => {
    const option = getOptionByKey(localData, $$key);
    if ((option.hasOptions && isParentSelectable === null) || isClickFromButton) {
      setBrowserKey($$key);
      focusListBoxBrowser();
      if (event) event.stopPropagation();
    }
  };

  const handleUp = _parent => () => {
    setBrowserKey(`${_parent}`);
    focusListBoxBrowser();
  };

  function handleClickBreadcrumb(option) {
    setBrowserKey(`${option.$$key}`);
    focusListBoxBrowser();
  }

  React.useEffect(() => {
    onChange(selectedOptions);
  }, [onChange, selectedOptions]);

  return (
    <div isParentSelectable={isParentSelectable} css={container} height={height}>
      <Title
        rootTitle={rootTitle}
        browserTitle={browserTitle}
        onClickBreadcrumb={handleClickBreadcrumb}
        browserKey={browserKey}
        data={localData}
      />
      <div css={flex}>
        <CustomListBox
          browserKey="root"
          height={height}
          isMulti={isMulti}
          onChange={handleChange("root")}
          onClickNavigate={handleClickRoot}
          options={localData}
          rootKey={rootKey}
          selectedOptions={selectedOptions}
          isParentSelectable={isParentSelectable}
        />
        <CustomListBox
          id={browserKey}
          browserKey={browserKey}
          hasOnUp={!isRoot(browserOptions.parent)}
          height={height}
          isMulti={isMulti}
          onChange={handleChange("browser")}
          onClickNavigate={handleClickBrowser}
          onUp={handleUp(browserOptions.parent)}
          options={browserOptions.attributes.options}
          selectedOptions={selectedOptions}
          isParentSelectable={isParentSelectable}
        />
      </div>
      {Object.keys(selectedOptions).length ? <OptionsSelected options={selectedOptions} /> : null}
    </div>
  );
}

ListBoxBrowser.propTypes = propTypes;
ListBoxBrowser.defaultProps = defaultProps;
