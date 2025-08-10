/*
 *
 * Package: `@exsys-clinio/global-app-constants`.
 *
 */
import { spacings, colors } from "@exsys-clinio/theme-values";

export const T_TRANSLATE_REGEXP = /__t__\w+/gim;

export const APP_HEADER_HEIGHT = `calc(${spacings.sp6} + ${spacings.sp9})`;
export const APP_HEADER_MARGIN = spacings.sp4;
export const APP_HEADER_HORIZONTAL_PADDING = spacings.sp6;
export const APP_FOOTER_HEIGHT = `calc(${spacings.sp9} - ${spacings.sp1})`;

export const LANGUAGE_IDS = Object.freeze({
  PRIMARY: 1,
  SECONDARY: 2,
} as const);

export const LANGUAGE_IDS_VALUES = Object.values(LANGUAGE_IDS);

export type LanguageValuesType = 1 | 2;

export const LANGUAGE_DIRS = Object.freeze({
  [LANGUAGE_IDS.PRIMARY]: "ltr",
  [LANGUAGE_IDS.SECONDARY]: "rtl",
});

export const QUERY_TYPES = Object.freeze({
  QUERY: "query",
  U_CODES: "u_code",
  CODES: "code",
} as const);

export const CLIENT_NAME_KEYS = {
  // hokmaa
  H: "H",
  // sagaf
  S: "S",
};

export const CLIENTS_CONFIG = {
  [CLIENT_NAME_KEYS.H]: {
    headerHeight: "80px",
    headerLogoHeight: "75",
    useCustomFooter: true,
    footerHeight: "260px",
    footerBackgroundColor: colors.green1,
  },
  [CLIENT_NAME_KEYS.S]: {
    headerHeight: APP_HEADER_HEIGHT,
    headerLogoHeight: "50",
    useCustomFooter: false,
    footerHeight: APP_FOOTER_HEIGHT,
    footerBackgroundColor: colors.white,
  },
};
