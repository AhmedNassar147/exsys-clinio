/*
 *
 * Styled: `@exsys-clinio/app-footer`.
 *
 */
import styled from "styled-components";
import { colors, fontSizes } from "@exsys-clinio/theme-values";
import {
  APP_HEADER_HORIZONTAL_PADDING,
  APP_FOOTER_HEIGHT,
} from "@exsys-clinio/global-app-constants";

export const StyledFooter = styled.footer`
  position: fixed;
  z-index: 0;
  bottom: 0;
  background-color: ${colors.white};
  width: 100%;
  color: ${colors.lightBlack};
  font-size: ${fontSizes.ff9};
  padding: 6px 50px;
  padding: 6px ${APP_HEADER_HORIZONTAL_PADDING};
  height: ${APP_FOOTER_HEIGHT};
  font-family: Roboto;
  display: flex;
  direction: ltr;
  gap: 8px;
  justify-content: center;
  align-items: center;
`;

export const FooterImage = styled.img`
  height: 26px;
  width: 50px;
`;
