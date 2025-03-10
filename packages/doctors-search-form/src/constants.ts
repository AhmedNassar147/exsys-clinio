/*
 *
 * Constants: `@exsys-clinio/doctors-search-form`.
 *
 */
import { InitialPatientDataType } from "@exsys-clinio/types";

export const PERIOD_OPTIONS = [
  {
    label: "tdy",
    value: "T",
  },
  {
    label: "nerst",
    value: "N",
  },
];

export const INITIAL_FORM_STATE = {
  organization_no: "",
  specialty_no: "",
  period_type: "N",
  currentPatientData: {} as InitialPatientDataType,
};
