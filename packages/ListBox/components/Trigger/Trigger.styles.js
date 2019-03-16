import styled from "styled-components";
import RawButtonStyled from "@paprika/raw-button/RawButton.styles";
import tokens from "@paprika/tokens";

export const ListBoxTriggerStyled = styled.div`
  position: relative;

  & > ${RawButtonStyled} {
    align-items: center;
    background-color: #ffffff;
    border-radius: 3px;
    border: 1px solid #d7d7d7;
    color: #3f3d3c;
    display: block;
    font-size: 14px;
    overflow: hidden;
    padding-right: 32px;
    padding: 8px;
    padding-right: 24px;
    position: relative;
    text-align: left;
    text-overflow: ellipsis;
    transition: border-color 0.2s;
    white-space: nowrap;
    width: 100%;

    ${props => {
      const isDisabled = props.isDisabled ? `color: ${tokens.color.blackLighten60};` : "";

      return `
        ${isDisabled}
      `;
    }}
  }
`;

export const TriggerArrowStyled = styled.span`
  ${props => {
    if (props.hasRenderLabel || props.isInlineDisplay) {
      return "display: none";
    }

    const isDisabled = props.isDisabled ? `color: ${tokens.color.blackLighten60};` : "";
    const rotate = props.isOpen ? `transform: rotate(180deg);` : `transform: rotate(0);`;

    return `
      position: absolute;
      top: 50%;
      margin-top: -6px;
      right: 12px;
      font-size: 11px;
      color: #333;
      pointer-events: none;
      transition: all 0.4s ease;
      ${rotate}
      ${isDisabled}
    `;
  }}
`;