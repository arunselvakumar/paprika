import styled from "styled-components";
import Tag from "@paprika/tag";

export const TagStyled = styled(Tag)`
  margin: 2px;

  ${props => {
    const hasFocusStyle = props.isTagActive ? `border: 2px solid #b2d7ff` : "";
    return `
      && {${hasFocusStyle}}
    `;
  }}
`;
