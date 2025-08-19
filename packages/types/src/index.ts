/*
 *
 * Package: `@exsys-clinio/types`.
 *
 */
import { CapitalBooleanStringType } from "./base.interface";

export interface BaseSvgProps {
  width?: string;
  height?: string;
  className?: string;
  color?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export type ModalToggleTypeForRef = {
  handleClose: () => void;
  handleOpen: () => void;
  toggle: () => void;
};

export type ModalTogglerRef = React.MutableRefObject<
  ModalToggleTypeForRef | undefined
>;

export interface AppConfigStateType {
  languageId: number;
  authorization: number;
  isRightToLeft: boolean;
  headerHeight: string;
  siteLogoUrl: string;
  headerLogoHeight: string;
  hideGenderField?: CapitalBooleanStringType;
  hideWhereFoundUsField?: CapitalBooleanStringType;
  hideHoursAndSeniorityLevel?: CapitalBooleanStringType;
  footerHeight: string;
  footerBackgroundImageUrl?: string;
}

export interface InitialPatientDataType {
  patientName: string;
  phone_m: string;
  gender: string;
  where_find: string;
  id_type: string;
  id_no: string;
  date_of_birth: string;
}

export * from "./base.interface";
export * from "./form-field.interface";
export * from "./network.interface";
export * from "./styledHelpers.interface";
