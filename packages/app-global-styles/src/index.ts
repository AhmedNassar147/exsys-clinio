/*
 *
 * Package: `@exsys-clinio/app-global-styles`.
 *
 */
import { createGlobalStyle, css } from "styled-components";
import { colors, spacings } from "@exsys-clinio/theme-values";
import { customScrollbar } from "@exsys-clinio/styled-helpers";
import mediaQueries from "@exsys-clinio/media-queries";
import {
  APP_HEADER_HEIGHT,
  APP_HEADER_MARGIN,
  APP_HEADER_HORIZONTAL_PADDING,
  APP_FOOTER_HEIGHT,
} from "@exsys-clinio/global-app-constants";

const fromXlMainCss = css`
  padding: 0 ${APP_HEADER_HORIZONTAL_PADDING};
`;

const mainHeight = `calc(100vh - ${APP_HEADER_HEIGHT} - ${APP_HEADER_MARGIN} - ${APP_FOOTER_HEIGHT})`;

const AppGlobalStyles = createGlobalStyle`
  html {
    box-sizing: border-box;
    scrollbar-width: thin;
    -webkit-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
    -ms-overflow-style: scrollbar;
    -webkit-tap-highlight-color: transparent;
    font-size: 62.5%;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
    font-family: "Roboto";
  }

  body {
    margin: 0;
    padding: 0;
    background-color: ${colors.white};
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", 'Work Sans',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
    ${customScrollbar};
  }

  h1, h2, h3, p {
    margin-top: 0;
    margin-bottom: 0;
  }

  svg {
    overflow: hidden;
  }

  main {
    min-height: ${mainHeight};
    max-height: ${mainHeight};
    width: 100%;
    overflow: auto;
  };
  .main-clinio-app-wrapper{
    min-height: inherit;
    max-height: inherit;
    width: 100%;
    padding: 0 ${spacings.sp4};
    margin: unset;
    flex-direction: column;
    ${mediaQueries.md`
      padding: 0 ${APP_HEADER_HORIZONTAL_PADDING};
    `};
    ${mediaQueries.xl`
      padding: 0 ${APP_HEADER_HORIZONTAL_PADDING};
    `}

    ${mediaQueries.xxl`
      ${fromXlMainCss};
      flex-direction: row;
    `}
    ${mediaQueries.xxxl`
      ${fromXlMainCss};
      flex-direction: row;
    `}
  }

  .client-logo {
    width: 100%;
    height: 180px;
    ${mediaQueries.xxl`
      width: 650px;
    `};
  }
`;

export default AppGlobalStyles;
