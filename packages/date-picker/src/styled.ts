/*
 *
 * Styled: `@exsys-clinio/date-picker`.
 *
 */
import { ComponentType } from "react";
import styled, { css } from "styled-components";
import DatePicker from "antd/es/date-picker";
import { colors } from "@exsys-clinio/theme-values";
import { RecordTypeWithAnyValue } from "@exsys-clinio/types";

const style = css<RecordTypeWithAnyValue>`
  width: 100%;
  ${({ error }) =>
    error &&
    `
    border-color: ${colors.red};
  `};

  ${({ width }) =>
    width &&
    `
    width: ${width};
  `};

  ${({ margin }) =>
    margin &&
    `
  margin: ${margin};
`};
`;

export const StyledDatePicker = styled<ComponentType<RecordTypeWithAnyValue>>(
  DatePicker
)`
  ${style}
`;
