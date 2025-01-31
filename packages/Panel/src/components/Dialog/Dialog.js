import React from "react";
import PropTypes from "prop-types";
import * as types from "../../types";
import * as sc from "./Dialog.styles";

function Dialog(props) {
  const [isAnimating, setIsAnimating] = React.useState(true);
  const refPanel = React.useRef(null);

  const {
    a11yText,
    children,
    footer,
    getPushContentElement,
    groupOffsetY,
    onAnimationEnd,
    header,
    height,
    isInline,
    offset,
    onClose,
    refHeader,
    refPanelContent,
    width,
    isOpen,
    slideFrom,
    ...moreProps
  } = props;

  const isFooterSticky = footer && footer.props.isSticky;
  const isHeaderSticky = header && header.props.isSticky;

  const dialogMain = (
    <>
      <sc.DialogContent
        data-pka-anchor="panel.content"
        hasPushedElement={!!getPushContentElement}
        isOpen={isOpen}
        ref={refPanelContent}
        role="region"
        tabIndex="0"
      >
        {children}
      </sc.DialogContent>
    </>
  );
  React.useEffect(() => {
    setIsAnimating(true);
  }, [isOpen]);

  const dialogFooter = footer ? React.cloneElement(footer, { refPanel }) : null;
  const dialogHeader = header ? React.cloneElement(header, { ref: refHeader, onClose, getPushContentElement }) : null;

  const handleAnimationEnd = () => {
    setIsAnimating(false);
    onAnimationEnd();
  };

  const renderDialogContent = () =>
    isFooterSticky || isHeaderSticky ? (
      <sc.Main>
        {isHeaderSticky && dialogHeader}
        <sc.DialogMain>
          {!isHeaderSticky && dialogHeader}
          {dialogMain}
          {!isFooterSticky && dialogFooter}
        </sc.DialogMain>
        {isFooterSticky && dialogFooter}
      </sc.Main>
    ) : (
      <>
        {dialogHeader}
        {dialogMain}
        {dialogFooter}
      </>
    );

  return (
    <sc.Dialog
      aria-modal={isInline ? null : "true"}
      aria-label={a11yText}
      groupOffsetY={groupOffsetY}
      hasPushedElement={!!getPushContentElement}
      height={height}
      isAnimating={isAnimating}
      isInline={isInline}
      isOpen={isOpen}
      offset={offset}
      onAnimationEnd={handleAnimationEnd}
      ref={refPanel}
      role="dialog"
      slideFrom={slideFrom}
      tabIndex="-1"
      width={width}
      {...moreProps}
    >
      {renderDialogContent()}
    </sc.Dialog>
  );
}

const propTypes = {
  a11yText: PropTypes.string,
  children: PropTypes.node.isRequired,
  footer: PropTypes.node,
  getPushContentElement: PropTypes.func,
  groupOffsetY: PropTypes.number,
  header: PropTypes.node,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  isInline: PropTypes.bool,
  offset: PropTypes.shape({
    top: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired,
    right: PropTypes.number.isRequired,
  }).isRequired,
  onAnimationEnd: PropTypes.func.isRequired,
  onClose: PropTypes.func,
  refHeader: PropTypes.shape({ current: PropTypes.node }).isRequired,
  refPanelContent: PropTypes.shape({ current: PropTypes.node }).isRequired,
  slideFrom: PropTypes.oneOf([types.slideFroms.RIGHT, types.slideFroms.LEFT, types.slideFroms.BOTTOM]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  isOpen: PropTypes.bool.isRequired,
};

const defaultProps = {
  a11yText: null,
  footer: null,
  getPushContentElement: () => {},
  groupOffsetY: 0,
  header: null,
  isInline: false,
  onClose: () => {},
  slideFrom: types.slideFroms.RIGHT,
};

Dialog.propTypes = propTypes;
Dialog.defaultProps = defaultProps;

export default Dialog;
