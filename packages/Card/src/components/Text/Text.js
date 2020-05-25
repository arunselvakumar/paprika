import React from "react";
import PropTypes from "prop-types";
import * as sc from "./Text.styles";

const propTypes = {
  /** Body content of the Text. */
  children: PropTypes.node,
  shouldTruncate: PropTypes.bool,
};

const defaultProps = {
  children: null,
  shouldTruncate: false,
};

const Text = props => {
  const { children, shouldTruncate } = props;

  const textProps = {
    children,
    shouldTruncate,
  };

  function truncateText(text, num) {
    if (text.length <= num) {
      return text;
    }
    return text.slice(0, num).concat("...");
  }

  if (shouldTruncate) {
    const text = truncateText(children, 135);
    textProps.children = text;
  }

  return (
    <sc.textStyles title={children} data-pka-anchor="card.text" {...textProps}>
      {textProps.children}
    </sc.textStyles>
  );
};

Text.displayName = "Text";
Text.propTypes = propTypes;
Text.defaultProps = defaultProps;

export default Text;