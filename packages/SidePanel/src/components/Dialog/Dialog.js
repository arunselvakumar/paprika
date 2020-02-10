import React from "react";
import PropTypes from "prop-types";
import * as sc from "./Dialog.styles";

const propTypes = {
  children: PropTypes.node.isRequired,
  footer: PropTypes.node,
  groupOffsetY: PropTypes.number,
  header: PropTypes.node,
  kind: PropTypes.oneOf(["default", "child"]),
  isCompact: PropTypes.bool,
  isInline: PropTypes.bool,
  offsetY: PropTypes.number,
  onAnimationEnd: PropTypes.func.isRequired,
  onClose: PropTypes.func,
  refHeader: PropTypes.shape({ current: PropTypes.instanceOf(Element) }).isRequired,
  refSidePanelContent: PropTypes.shape({ current: PropTypes.instanceOf(Element) }).isRequired,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  isOpen: PropTypes.bool.isRequired,
};

const defaultProps = {
  footer: null,
  groupOffsetY: 0,
  header: null,
  kind: "default",
  isCompact: false,
  isInline: false,
  offsetY: 0,
  onClose: () => {},
};

function Dialog(props) {
  const refSidePanel = React.useRef(null);

  const {
    children,
    footer,
    groupOffsetY,
    onAnimationEnd,
    header,
    kind,
    isCompact,
    isInline,
    offsetY,
    onClose,
    refHeader,
    refSidePanelContent,
    width,
    isOpen,
    ...moreProps
  } = props;

  return (
    <sc.Dialog
      aria-modal={isInline ? null : "true"}
      groupOffsetY={groupOffsetY}
      kind={kind}
      isCompact={isCompact}
      isInline={isInline}
      isOpen={isOpen}
      offsetY={offsetY}
      onAnimationEnd={onAnimationEnd}
      ref={refSidePanel}
      role="dialog"
      tabIndex="-1"
      width={width}
      {...moreProps}
    >
      {header ? React.cloneElement(header, { ref: refHeader, isCompact, onClose }) : null}
      <sc.DialogContent
        data-pka-anchor="sidepanel.content"
        isCompact={isCompact}
        isOpen={isOpen}
        isSticky={footer ? footer.props.isSticky : undefined}
        footerHeight={footer ? footer.props.height : undefined}
        kind={kind}
        tabIndex="0"
        ref={refSidePanelContent}
      >
        {children}
      </sc.DialogContent>
      {footer ? React.cloneElement(footer, { refSidePanel, isCompact, width, isOpen }) : null}
    </sc.Dialog>
  );
}

export default Dialog;

Dialog.propTypes = propTypes;
Dialog.defaultProps = defaultProps;
