import styled, { css } from "styled-components";
import { theme } from "@paprika/themes";

export const Footer = styled.div(
  theme(
    "ListBox.Footer",
    () => css`
      border-top: 1px solid #d7d7d7;
      display: flex;
      justify-content: flex-start;
      padding: 8px;
      width: calc(100% - 16px);

      & > div {
        width: calc(50% - 8px);
        [role="button"] {
          margin-right: 8px;
        }
      }

      & > div + div {
        text-align: right;
      }
    `
  )
);
