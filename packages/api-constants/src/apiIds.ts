/*
 *
 * apiIds: `@exsys-clinio/api-constants`.
 *
 */
const API_IDS = {
  // http://136.243.62.235:9090/ords/exsys_api/ex_web_patient_booking/pop_booking_branch?planguageid=1&authorization=111111
  QUERY_ORGANIZATION_LIST: "ex_web_patient_booking/pop_booking_branch",
  // http://207.180.237.36:9090/ords/exsysexsysdba/EX_SECURITY/Ex_page_lable?pPageId=clinicalDoctorsSearch&planguageid=1&authorization=1634454
  QUERY_EXSYS_PAGE_LABELS: "EX_SECURITY/Ex_page_lable",
  // http://207.180.237.36:9090/ords/exsys_api/ex_web_patient_booking/web_clinical_specialities?authorization=2878756&planguageid=1
  QUERY_CLINICAL_SPECIALTIES_LIST:
    "ex_web_patient_booking/web_clinical_specialities",
  // http://136.243.62.235:9090/ords/exsys_api/ex_web_patient_booking/web_clinical_list?planguageid=1&specialty_no=&period_type=N&authorization=111111&organization_no=03
  QUERY_CLINICAL_LIST: "ex_web_patient_booking/web_clinical_list",
  // http://207.180.237.36:9090/ords/exsys_api/ex_web_patient_booking/web_doctor_session?authorization=3524880&planguageid=1&clinical_entity_no=1&poffset=0&period_type=N&slotsPerOffset=4
  QUERY_SESSIONS_BY_CLINICAL_ENTITY_NO:
    "ex_web_patient_booking/web_doctor_session",
  // http://207.180.237.36:9090/ords/exsys_api/EX_CODES/POP_CODES_WITH_CODE?pcodetype=408&planguageid=1&authorization=2878756
  CODE_LIST: "EX_CODES/POP_CODES_WITH_CODE",
  // http://207.180.237.36:9090/ords/exsys_api/EX_CODES/pop_codes_with_u_code?pcodetype=408&planguageid=1&authorization=2878756
  U_CODE_LIST: "EX_CODES/pop_codes_with_u_code",
  // http://207.180.237.36:9090/ords/exsys_api/ex_web_patient_booking/web_create_booking
  POST_CREATE_PATIENT_BOOKING: "ex_web_patient_booking/web_create_booking",
  // http://207.180.237.36:9090/ords/exsys_api/ex_web_patient_booking/search_patient_booking?authorization=3574833&planguageid=1&id_no=2134567896&id_type=I&phone_m=01003596835
  QUERY_PATIENT_OLD_DATA: "ex_web_patient_booking/search_patient_booking",
  // http://207.180.237.36:9090/ords/exsysexsysdba/Ex_Booking/cancel_booking
  PUT_CANCEL_PATIENT_BOOKING: "Ex_Booking/cancel_booking",
};

export default API_IDS;
