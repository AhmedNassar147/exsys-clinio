/*
 *
 * Constants: `@exsys-clinio/booking-modal`.
 *
 */
interface PreviousReservationsItemType {
  total: number;
  appointment_id: number;
  session_code: number;
  bookingDate: string;
  bookingNo: string;
  clinical: string;
  doctor_id: string;
  doctor_name: string;
}

export const FORM_INITIAL_VALUES = {
  patientName: "",
  phone_m: "",
  gender: "",
  where_find: "",
  id_type: "N",
  id_no: "",
  date_of_birth: "",
  isPatientNotFound: "",
  showPatientDataForm: false,
  previousReservations: [] as PreviousReservationsItemType[],
} as const;

export type FormInitialValuesType = typeof FORM_INITIAL_VALUES;

export const minimumBirthDate = new Date("1920-01-01");

export const maximumBirthDate = new Date();
