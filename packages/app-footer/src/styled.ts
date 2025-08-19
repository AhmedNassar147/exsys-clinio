/*
 *
 * Styled: `@exsys-clinio/app-footer`.
 *
 */
import styled from "styled-components";
import { colors, fontSizes } from "@exsys-clinio/theme-values";
import { APP_HEADER_HORIZONTAL_PADDING } from "@exsys-clinio/global-app-constants";

export const StyledFooter = styled.footer<{
  footerHeight: string;
  footerBackgroundImageUrl?: string;
}>`
  position: fixed;
  z-index: 0;
  bottom: 0;
  width: 100%;
  color: ${colors.lightBlack};
  font-size: ${fontSizes.ff9};
  padding: 6px ${APP_HEADER_HORIZONTAL_PADDING};
  ${({ footerHeight, footerBackgroundImageUrl }) => {
    return `
      height: ${footerHeight};
      background-image: ${
        footerBackgroundImageUrl ? `url(${footerBackgroundImageUrl})` : "none"
      };
    `;
  }}
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
