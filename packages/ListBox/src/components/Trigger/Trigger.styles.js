import styled from "styled-components";
import RawButton from "@paprika/raw-button";
import RawButtonStyled from "@paprika/raw-button/lib/RawButton.styles";
import tokens from "@paprika/tokens";

const triggerStyles = `
padding: 8px; /* Define Trigger's height */
align-items: center;
background-color: #ffffff;
border: 1px solid #d7d7d7;
border-radius: 3px;
color: #3f3d3c;
display: block;
font-size: 14px;
position: relative;
text-align: left;
transition: border-color 0.2s;
width: 100%;
`;

const triggerStylesProps = () => props => {
  const isDisabled = props.isDisabled ? `color: ${tokens.color.blackLighten60};` : "";
  return props.isInline
    ? `
      ${triggerStyles}
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      ${isDisabled}
    `
    : `
      & > [data-raw-button="trigger"] {
        ${triggerStyles}
        ${isDisabled}
      }
    `;
};

export const ListBoxTriggerStyled = styled.div`
  position: relative;
  ${triggerStylesProps()}
`;

export const TriggerActionIconsContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  pointer-events: none;
`;

export const RawButtonClearButtonStyled = styled(RawButton)`
  ${RawButtonStyled}
  && {
    align-items: center;
    border: 0;
    display: flex;
    height: 100%;
    padding: 0;
    padding-left: 8px;
    pointer-events: visible;
    position: relative;
    top: 1px;
    width: 32px;

    && span {
      background: #9c9c9c;
      border-radius: 50%;
      color: #fff;
      display: block;
      font-size: 13px;
      font-weight: bold;
      height: 15px;
      left: -1px;
      line-height: 1;
      position: relative;
      text-align: center;
      top: -1px;
      user-select: none;
      width: 15px;
      &:hover {
        background: #717171;
      }
    }

    ${props => {
      if (props.hasFooter && props.isPopoverOpen) {
        return "display: none";
      }

      if (props.hasRenderTrigger || !props.hasSelectedOptions) {
        return "display: none";
      }

      const isDisabled = props.isDisabled
        ? `
        color: ${tokens.color.blackLighten60};
        && span {
          background: ${tokens.color.blackLighten60};
          &:hover {
            background: ${tokens.color.blackLighten60}
          }
        };
      `
        : "";

      return `${isDisabled}`;
    }}
  }
`;

export const TriggerArrowStyled = styled.span`
  ${props => {
    if (props.hasRenderTrigger || props.isInline) {
      return "display: none";
    }

    const isDisabled = props.isDisabled ? `color: ${tokens.color.blackLighten60};` : "";
    const rotate = props.isOpen ? `transform: rotate(180deg);` : `transform: rotate(0);`;

    return `
      display: block;
      margin-right: 16px;
      font-size: 11px;
      color: #333;
      pointer-events: none;
      transition: all 0.4s ease;
      ${rotate}
      ${isDisabled}
    `;
  }}
`;