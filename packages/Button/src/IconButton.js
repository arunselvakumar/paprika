import React from "react";
import PropTypes from "prop-types";
import iconButtonStyles from "./IconButton.styles";
import Button from ".";

const IconPropTypes = {
  children: PropTypes.node.isRequired,
};

const IconButton = React.forwardRef((props, ref) => {
  const buttonProps = {
    children: null,
    icon: props.children,
    isFullWidth: false,
  };

  return <Button css={iconButtonStyles} {...props} {...buttonProps} ref={ref} />;
});

IconButton.displayName = "IconButton";
IconButton.propTypes = IconPropTypes;

export default IconButton;
