import { css } from "styled-components";
import tokens from "@paprika/tokens";
import stylers from "@paprika/stylers";

const pseudoElement = css`
  background: ${tokens.color.blackLighten60};
  content: "";
  display: inline-block;
  flex-grow: 1;
  height: 1px;
`;

const textDividerStyles = css`
  &:before {
    ${pseudoElement}
    margin-right: ${tokens.space};
  }

  &:after {
    ${pseudoElement}
    margin-left: ${tokens.space};
  }
`;

const lineDividerStyles = css`
  &:before {
    ${pseudoElement}
  }
`;

// css let the IDE recognize css highlight
export const dividerCSS = css`
  align-items: center;
  color: ${tokens.color.blackLighten20};
  display: flex;
  justify-content: center;
  padding: ${tokens.spaceSm};
  width: 100%;

  ${stylers.fontSize(-1)};

  ${({ hasChildren }) => (hasChildren ? textDividerStyles : lineDividerStyles)}
`;
