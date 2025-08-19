/*
 *
 * Package: `@exsys-clinio/doctors-search-page`.
 *
 */
import { memo, useCallback, useState } from "react";
import DoctorsSearchForm, {
  INITIAL_FORM_STATE as initialSearchParams,
} from "@exsys-clinio/doctors-search-form";
import LazyLoadedBookingModal from "@exsys-clinio/booking-modal";
import { useBasicQuery } from "@exsys-clinio/network-hooks";
import useFromManager from "@exsys-clinio/form-manager";
import { colors } from "@exsys-clinio/theme-values";
import Flex from "@exsys-clinio/flex";
import { convertInputDateToNormalFormat } from "@exsys-clinio/helpers";
import Text from "@exsys-clinio/text";
import DoctorsResultList, {
  DoctorInfoType,
} from "@exsys-clinio/doctors-search-results-list";
import type {
  InitialPatientDataType,
  OnResponseActionType,
  RecordType,
} from "@exsys-clinio/types";

const { lightGreen } = colors;

const DoctorsSearchPage = () => {
  const [patientModalVisible, setPatientModalVisibility] = useState(true);

  const [doctorsData, setDoctorsData] = useState<DoctorInfoType[]>([]);
  const { values: searchFormValues, handleChange } = useFromManager({
    initialValues: initialSearchParams,
  });

  const handleDoctorsResponse: OnResponseActionType<
    RecordType<DoctorInfoType[]>
  > = useCallback(({ apiValues, error }) => {
    const { data } = apiValues;
    setDoctorsData(() => (!!error || !data ? [] : data));
  }, []);

  const { currentPatientData, ...otherSearchValues } = searchFormValues;

  const { period_type, organization_no } = searchFormValues;
  const { patientName, date_of_birth } = currentPatientData;

  const getDob = useCallback(
    (date_of_birth?: string) =>
      date_of_birth ? convertInputDateToNormalFormat(date_of_birth) : "",
    []
  );

  const { runQuery, loading } = useBasicQuery({
    apiId: "QUERY_CLINICAL_LIST",
    runQueryWhenLanguageChanged: true,
    callOnFirstRender: true,
    onResponse: handleDoctorsResponse,
    disableParamsChangeCheck: true,
  });

  const onClickSearch = useCallback(
    () => runQuery({ ...otherSearchValues, dob: getDob(date_of_birth) }),
    [runQuery, otherSearchValues, date_of_birth, getDob]
  );

  const closePatientModal = useCallback(
    () => setPatientModalVisibility(false),
    []
  );

  const onDoneGetPatientData = useCallback(
    (patientData: InitialPatientDataType) => {
      handleChange({
        name: "currentPatientData",
        value: patientData,
      });

      const { date_of_birth } = patientData;

      runQuery({ ...otherSearchValues, dob: getDob(date_of_birth) });
    },
    [handleChange, otherSearchValues, runQuery, getDob]
  );

  return (
    <>
      {patientName && (
        <Flex width="100%" justify="center" align="center">
          <Text color={lightGreen} fontSize="ff4" align="center">
            __t__hello , {patientName}
          </Text>
        </Flex>
      )}

      <DoctorsSearchForm
        onSearch={onClickSearch}
        loading={loading}
        handleChange={handleChange}
        values={searchFormValues}
      />
      <DoctorsResultList
        loading={loading}
        doctorsDataList={doctorsData}
        periodType={period_type}
        organizationNo={organization_no}
        // selectedClinicalEntityNo={clinical_entity_no}
        currentPatientData={currentPatientData}
      />

      <LazyLoadedBookingModal
        shouldMountChunk={patientModalVisible}
        visible={patientModalVisible}
        onClose={closePatientModal}
        onlyUsePatientView
        onDoneGetPatientData={onDoneGetPatientData}
      />
    </>
  );
};

export default memo(DoctorsSearchPage);
