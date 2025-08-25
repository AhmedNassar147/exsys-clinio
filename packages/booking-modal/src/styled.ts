/*
 *
 * Types: `@exsys-clinio/booking-modal`.
 *
 */
import styled from "styled-components";
import { spacings, colors, fontSizes } from "@exsys-clinio/theme-values";

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 1px;
  > thead {
    background-color: ${colors.appPrimary};
    color: ${colors.white};
    text-align: center;
    th {
      height: ${spacings.sp7};
      font-weight: bold;
      font-size: ${fontSizes.ff8};
    }
  }

  > tbody {
    text-align: center;
    td {
      font-size: ${fontSizes.ff9};
      border-block-end: 1px solid ${colors.inputBorderColor};
      padding: ${spacings.sp1};
      &:not(:last-child) {
        border-inline-end: 1px solid ${colors.inputBorderColor};
      }
    }
  }
`;
