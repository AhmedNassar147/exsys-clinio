/*
 *
 * Styled: `@exsys-clinio/app-header`.
 *
 */
import styled from "styled-components";
import {
  APP_HEADER_MARGIN,
  APP_HEADER_HORIZONTAL_PADDING,
} from "@exsys-clinio/global-app-constants";
import { colors, zIndices } from "@exsys-clinio/theme-values";

export const StyledHeader = styled.header<{ headerHeight: string }>`
  position: sticky;
  top: 0;
  height: ${({ headerHeight }) => headerHeight};
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 ${APP_HEADER_HORIZONTAL_PADDING};
  margin-bottom: ${APP_HEADER_MARGIN};
  background-color: ${colors.white};
  z-index: ${zIndices.appHeader};
  border-bottom: 1px solid ${colors.inputBorderColor};
  text-shadow: 0 -1px 0 rgb(0 0 0 / 12%);
  -webkit-box-shadow: 0px 2px 0 rgb(0 0 0 / 3%);
  box-shadow: 0px 2px 0 rgb(0 0 0 / 3%);
  justify-content: space-between;
`;

export const StyledLogo = styled.img<{ headerLogoHeight: string }>`
  height: ${({ headerLogoHeight }) => `${headerLogoHeight}px`};
`;
