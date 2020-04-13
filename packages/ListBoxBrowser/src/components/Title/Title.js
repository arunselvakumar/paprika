import React from "react";
import PropTypes from "prop-types";
import { title, flex, crumb } from "./Title.styles";
import { getBreadcrumb, getOptionByKey, isRoot } from "../../helpers";
import Breadcrumb from "../Breadcrumb";
import { ListBoxBrowserContext } from "../../ListBoxBrowser";

const propTypes = {
  rootTitle: PropTypes.node.isRequired,
  browserTitle: PropTypes.node.isRequired,
  data: PropTypes.arrayOf(PropTypes.object), // eslint-disable-line
  browserKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onClickBreadcrumb: PropTypes.func.isRequired,
  hasLeftColumn: PropTypes.bool.isRequired,
};

export default function Title(props) {
  const { rootTitle, browserTitle, data, browserKey, onClickBreadcrumb, hasLeftColumn } = props;

  const handleClick = option => () => {
    onClickBreadcrumb(option);
  };

  const option = React.useMemo(() => getOptionByKey(data, browserKey), [data, browserKey]);
  const breadcrumb = React.useMemo(() => {
    return getBreadcrumb({ data, option });
  }, [data, option]);

  const { hasBreadcrumb } = React.useContext(ListBoxBrowserContext);
  const hasBrowserTitle = browserTitle !== "";

  return (
    <div css={flex} hasLeftColumn={hasLeftColumn}>
      {hasLeftColumn ? (
        <div css={title} data-pka-anchor="root-title">
          {rootTitle}
        </div>
      ) : null}
      <div css={title} data-pka-anchor="breadcrumb-title">
        {hasBreadcrumb ? (
          <>
            <span data-pka-anchor="breadcrumb-crumb" css={crumb}>
              {browserTitle}
            </span>
            <Breadcrumb onClick={handleClick} hasBrowserTitle={hasBrowserTitle} breadcrumb={breadcrumb} />
            <span data-pka-anchor="breadcrumb-crumb" css={crumb}>
              {breadcrumb.length || (hasBrowserTitle && !isRoot(option.parent)) ? " / " : null}
              {!isRoot(option.parent) ? option.attributes.label : null}
            </span>
          </>
        ) : (
          browserTitle
        )}
      </div>
    </div>
  );
}

Title.propTypes = propTypes;
