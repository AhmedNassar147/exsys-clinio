/*
 *
 * Context: `@exsys-clinio/app-config-store`.
 *
 */
import { createContext } from "react";
import {
  LANGUAGE_DIRS,
  LANGUAGE_IDS,
  LANGUAGE_IDS_VALUES,
  LanguageValuesType,
} from "@exsys-clinio/global-app-constants";
import { setItemToStorage, getItemFromStorage } from "@exsys-clinio/helpers";
import {
  AppConfigStateType,
  CapitalBooleanStringType,
} from "@exsys-clinio/types";
import { AppConfigStoreApi } from "./index.interface";

const NOT_FOUND_LANG_CODE = 999999999;

const {
  location: { pathname: appPathName },
} = window;
const [preferredUserLanguageFromAppUrl] = appPathName
  .split("/")
  .filter(Boolean);

const preferredUserLanguageFromAppUrlNumber =
  !preferredUserLanguageFromAppUrl || isNaN(+preferredUserLanguageFromAppUrl)
    ? NOT_FOUND_LANG_CODE
    : +preferredUserLanguageFromAppUrl;

const isFakeLanguageId =
  preferredUserLanguageFromAppUrlNumber === NOT_FOUND_LANG_CODE ||
  !LANGUAGE_IDS_VALUES.includes(
    preferredUserLanguageFromAppUrlNumber as LanguageValuesType
  );

const mainStoreData = getItemFromStorage<AppConfigStateType>("mainStore");

const activeLanguage = (
  isFakeLanguageId
    ? mainStoreData?.languageId ?? LANGUAGE_IDS.SECONDARY
    : preferredUserLanguageFromAppUrlNumber
) as LanguageValuesType;

export const baseClientConfigData = {
  headerHeight: "60px",
  siteLogoUrl: "",
  headerLogoHeight: "50",
  footerHeight: "45px",
  hideHoursAndSeniorityLevel: "N" as CapitalBooleanStringType,
  footerBackgroundImageUrl: "",
  hideGenderField: "N" as CapitalBooleanStringType,
  hideWhereFoundUsField: "N" as CapitalBooleanStringType,
};

export const initialState: AppConfigStateType = {
  authorization: 111111,
  languageId: activeLanguage,
  isRightToLeft:
    LANGUAGE_DIRS[activeLanguage] !== LANGUAGE_DIRS[LANGUAGE_IDS.PRIMARY],
  ...baseClientConfigData,
};

setItemToStorage("mainStore", initialState);

export default createContext<AppConfigStoreApi>({
  state: initialState,
  // @ts-ignore
  setAuthValues: (state: AppConfigStateType) => state,
});
