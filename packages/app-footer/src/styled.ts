/*
 *
 * Styled: `@exsys-clinio/app-footer`.
 *
 */
import styled from "styled-components";
import { colors, fontSizes } from "@exsys-clinio/theme-values";
import { APP_HEADER_HORIZONTAL_PADDING } from "@exsys-clinio/global-app-constants";

export const StyledFooter = styled.footer<{ useCustomFooter?: boolean }>`
  position: ${({ useCustomFooter }) =>
    useCustomFooter ? "relative" : "fixed"};
  z-index: 0;
  bottom: 0;
  width: 100%;
  color: ${colors.lightBlack};
  font-size: ${fontSizes.ff9};
  padding: 6px ${APP_HEADER_HORIZONTAL_PADDING};
  ${({ theme: { footerBackgroundColor, footerHeight } }) => {
    return `
      background-color: ${footerBackgroundColor};
      height: ${footerHeight};
    `;
  }}

  ${({ useCustomFooter }) =>
    !!useCustomFooter &&
    `
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 60px;
      background: white;
      clip-path: polygon(
        0 0,
        5% 60%,
        10% 0,
        15% 60%,
        20% 0,
        25% 60%,
        30% 0,
        35% 60%,
        40% 0,
        45% 60%,
        50% 0,
        55% 60%,
        60% 0,
        65% 60%,
        70% 0,
        75% 60%,
        80% 0,
        85% 60%,
        90% 0,
        95% 60%,
        100% 0
      );
    }
  `};
  font-family: Roboto;
  direction: ltr;
  display: flex;
  gap: 8px;
  justify-content: center;
  align-items: center;
`;

export const FooterImage = styled.img`
  height: 26px;
  width: 50px;
`;

export const StyledLink = styled.a`
  color: ${colors.lightBlack};
  text-decoration: none;
  cursor: pointer;
`;
