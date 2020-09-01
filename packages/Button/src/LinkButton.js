import React from "react";
import PropTypes from "prop-types";
import NewTabIcon from "@paprika/icon/lib/NewTab";
import * as constants from "@paprika/constants/lib/Constants";
import * as types from "./types";
import buttonStyles from "./Button.styles";
import * as sc from "./LinkButton.styles";

const LinkButton = React.forwardRef((props, ref) => {
  const { a11yText, children, href, isDisabled, shouldOpenNewTab, kind, size, suffixIcon, ...moreProps } = props;

  const shouldOpenNewTabProps = {
    target: "_blank",
    rel: "noopener noreferrer",
  };

  const iconProps = {
    isDisabled,
    kind,
  };

  return (
    <a
      aria-label={a11yText}
      css={buttonStyles}
      href={!isDisabled ? href : null}
      isDisabled={isDisabled}
      kind={kind}
      size={size}
      {...(shouldOpenNewTab ? shouldOpenNewTabProps : {})}
      {...moreProps}
      as={isDisabled ? "span" : "a"}
      ref={ref}
    >
      {children}
      <sc.LinkButtonIcon {...iconProps} isSuffixIcon>
        {kind === types.LINK && shouldOpenNewTab && suffixIcon}
      </sc.LinkButtonIcon>
    </a>
  );
});

LinkButton.types = {
  kind: constants.kind,
  size: constants.defaultSize,
};

const propTypes = {
  a11yText: PropTypes.string,
  children: PropTypes.node.isRequired,
  href: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool,
  kind: PropTypes.oneOf([
    LinkButton.types.kind.DEFAULT,
    LinkButton.types.kind.PRIMARY,
    LinkButton.types.kind.SECONDARY,
    LinkButton.types.kind.DESTRUCTIVE,
    LinkButton.types.kind.FLAT,
    LinkButton.types.kind.MINOR,
    LinkButton.types.kind.LINK,
  ]),
  size: PropTypes.oneOf([LinkButton.types.size.SMALL, LinkButton.types.size.MEDIUM, LinkButton.types.size.LARGE]),
  shouldOpenNewTab: PropTypes.bool,
  suffixIcon: PropTypes.node,
};

const defaultProps = {
  a11yText: null,
  isDisabled: false,
  kind: LinkButton.types.kind.LINK,
  shouldOpenNewTab: false,
  size: LinkButton.types.size.MEDIUM,
  suffixIcon: <NewTabIcon />,
};

LinkButton.displayName = "LinkButton";
LinkButton.propTypes = propTypes;
LinkButton.defaultProps = defaultProps;

export default LinkButton;
