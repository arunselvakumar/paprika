import stylers from "@paprika/stylers";
import tokens from "@paprika/tokens";
import styled, { css, keyframes } from "styled-components";

const childPanel = css`
  ${props => {
    const totalOffset = props.isCompact ? 48 : 64;
    const childBottomOffsetY = totalOffset + props.groupOffsetY + props.offsetY;
    return css`
      border-bottom-left-radius: ${tokens.spaceSm};
      border-top-left-radius: ${tokens.spaceSm};
      height: calc(100% - ${childBottomOffsetY}px);
      margin-top: ${props.isCompact ? `${stylers.spacer(3)}` : `${stylers.spacer(4)}`};
    `;
  }}
`;

function slideIn(slideDirection) {
  return keyframes`
  from {
    transform: ${slideDirection === "right" ? "translateX(100%)" : `translateX(-100%)`};
  }
  to {
    transform: translateX(0);
  }
  `;
}

function slideOut(slideDirection) {
  return keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: ${slideDirection === "right" ? "translateX(100%)" : `translateX(-100%)`};
  }
  `;
}

const compactStyles = css`
  padding: ${stylers.spacer(2)};
`;

export const Dialog = styled.div`
  background: ${tokens.color.white};
  box-shadow: ${props => (props.getPushContentRef === null ? tokens.modal.shadow : "none")};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: auto;
  top: 0;

  &:focus {
    outline: 0;
  }

  ${props => {
    const width = Number.isNaN(Number(props.width)) ? props.width : `${props.width}px`;
    const animation = props.isOpen ? slideIn(props.slideDirection) : slideOut(props.slideDirection);

    let childSidePanel = "";

    if (props.kind === "child") {
      childSidePanel = childPanel;
    }

    return css`
      animation: ${animation} 0.4s forwards;
      right: 0;
      top: ${props.offsetY}px;
      width: ${width};
      z-index: ${props.zIndex};
      ${props => (props.slideDirection === "right" ? `right: 0;` : `left: 0;`)}
      ${props => (props.offsetY ? `height: calc(100% - ${props.offsetY}px);` : "")}
      ${props.isInline ? "position: relative;" : "position: fixed;"}
      ${childSidePanel}
    `;
  }}
`;

export const DialogContent = styled.div`
  flex-grow: 1;
  padding: ${stylers.spacer(3)};

  ${props => (props.isCompact || props.kind === "child" ? compactStyles : "")}

  &:focus {
    ${stylers.focusRing.subtle(true)};
  }
`;

export const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
  width: 100%;
`;

export const DialogMain = styled.div`
  flex-grow: 1;
  overflow-y: auto;
`;
