/*
 *
 * `BookingModal`: `@exsys-clinio/booking-modal`.
 *
 */
import { memo, useCallback, useMemo, useState } from "react";
import Modal from "@exsys-clinio/modal";
import Flex from "@exsys-clinio/flex";
import { spacings, colors } from "@exsys-clinio/theme-values";
import Text, { BaseText } from "@exsys-clinio/text";
// import { setItemToStorage, getItemFromStorage } from "@exsys-clinio/helpers";
import InputField from "@exsys-clinio/input-field";
import SelectWithApiQuery from "@exsys-clinio/select-with-api-query";
import useFromManager from "@exsys-clinio/form-manager";
import { useBasicMutation, useBasicQuery } from "@exsys-clinio/network-hooks";
import Image from "@exsys-clinio/image";
import Button from "@exsys-clinio/button";
import DeleteIcon from "@exsys-clinio/delete-icon";
import {
  OnResponseActionType,
  RecordTypeWithAnyValue,
  InitialPatientDataType,
} from "@exsys-clinio/types";
import {
  FORM_INITIAL_VALUES,
  minimumBirthDate,
  maximumBirthDate,
  FormInitialValuesType,
} from "./constants";
import { StyledDateInput, StyledTable } from "./styled";
import validateFormFields from "./helpers/validateFormFields";
import convertInputDateToNormalFormat from "./helpers/convertInputDateToNormalFormat";
import convertNormalFormattedDateToInputDate from "./helpers/convertNormalFormattedDateToInputDate";

interface BookingModalProps {
  visible: boolean;
  onClose: () => void;
  appointmentId?: number;
  bookingTime?: string;
  doctorImageUrl?: string;
  bookingDate?: string;
  clinicalName?: string;
  onBookingDoneSuccessfully?: () => void;
  onlyUsePatientView?: boolean;
  currentPatientData: InitialPatientDataType;
  onDoneGetPatientData?: (patientData: InitialPatientDataType) => void;
}

const {
  sp4: spacing4,
  sp22: spacing22,
  sp18: spacing18,
  sp27: spacing27,
  sp19: spacing19,
  sp3: spacing3,
  sp2: spacing2,
  sp32: spacing32,
  // sp20: spacing20,
} = spacings;

const valueMatchPattern = "/[a-zA-Z|ء-ي]+/gi";

const serverTextMargin = `0 0 ${spacing2}`;
const bookingInfoTextMargin = `${spacing2} 0 0`;
const bookingInfoCardMargin = `0 0 0 ${spacing3}`;

const { red, lightGreen, appPrimary } = colors;

const initialBookingApiDoneResults = {
  message: "",
  type: "",
  shouldCloseMainModalIfApplicable: false,
};

const BookingModal = ({
  visible,
  onClose,
  appointmentId,
  bookingTime,
  doctorImageUrl,
  bookingDate,
  clinicalName,
  onlyUsePatientView,
  onBookingDoneSuccessfully,
  onDoneGetPatientData,
  currentPatientData,
}: BookingModalProps) => {
  const [bookingResultModalState, setBookingResultModalState] = useState(
    initialBookingApiDoneResults
  );

  const { loading, mutate } = useBasicMutation({
    apiId: "POST_CREATE_PATIENT_BOOKING",
    includeLanguage: true,
  });

  const handleSaveBooking = useCallback(
    (fromValues: FormInitialValuesType) => {
      const {
        date_of_birth,
        previousReservations,
        showPatientDataForm,
        isPatientNotFound,
        ...values
      } = fromValues;

      if (onlyUsePatientView) {
        const patientData = {
          ...values,
          date_of_birth,
        } as InitialPatientDataType;

        onClose();

        onDoneGetPatientData?.(patientData);
        return;
      }

      mutate({
        body: {
          ...values,
          date_of_birth: convertInputDateToNormalFormat(date_of_birth),
          session_length: 0,
          booking_type: "N",
          appointment_id: appointmentId,
          // walking
          // session_code,
          // bookingDate: date
        },
        cb: ({ apiValues, error }) => {
          const { status } = apiValues;
          const isError = status !== "success";
          setBookingResultModalState({
            type: status,
            message: isError ? error || "flssve" : "donsucesfly",
            shouldCloseMainModalIfApplicable: true,
          });
        },
      });
    },
    [mutate, appointmentId, onlyUsePatientView, onDoneGetPatientData, onClose]
  );

  const formInitialValues = useMemo(
    () => ({
      ...FORM_INITIAL_VALUES,
      ...currentPatientData,
    }),
    [currentPatientData]
  );

  const {
    values: {
      patient_name_p,
      patient_name_2_p,
      patient_name_3_p,
      patient_name_f_p,
      date_of_birth,
      gender,
      where_find,
      id_no,
      id_type,
      phone_m,
      previousReservations,
      isPatientNotFound,
      showPatientDataForm,
    },
    handleChange,
    errors,
    handleSubmit,
    handleChangeMultipleInputs,
  } = useFromManager({
    initialValues: formInitialValues as typeof FORM_INITIAL_VALUES,
    validate: validateFormFields,
    onSubmit: handleSaveBooking,
  });

  const {
    id_no: initialIdNo,
    id_type: initialIdType,
    phone_m: initialIdPhone,
  } = formInitialValues;

  const handlePatientDataResponse: OnResponseActionType<RecordTypeWithAnyValue> =
    useCallback(
      ({ apiValues, error }) => {
        const { previousReservations, patientData } = apiValues || {};

        const { patientName, date_of_birth, ...otherPatientData } =
          patientData || {};

        const [
          patient_name_p,
          patient_name_2_p,
          patient_name_3_p,
          patient_name_f_p,
        ] = (patientName || "   ")?.split?.(" ");

        const {
          patient_name_p: initialPatientName,
          patient_name_2_p: initialPatientSecondName,
          patient_name_3_p: initialPatientThirdName,
          patient_name_f_p: initialPatientForthName,
        } = currentPatientData || {};

        const isPatientNotFound = !!error || !patientName;

        handleChangeMultipleInputs({
          previousReservations: previousReservations || [],
          patient_name_p: patient_name_p || initialPatientName,
          patient_name_2_p: patient_name_2_p || initialPatientSecondName,
          patient_name_3_p: patient_name_3_p || initialPatientThirdName,
          patient_name_f_p: patient_name_f_p || initialPatientForthName,
          date_of_birth: convertNormalFormattedDateToInputDate(date_of_birth),
          ...otherPatientData,
          isPatientNotFound,
          showPatientDataForm: !isPatientNotFound,
        });
      },
      [handleChangeMultipleInputs, currentPatientData]
    );

  const skipPatientDataQuery = useCallback(
    ({ id_no, phone_m, id_type }: RecordTypeWithAnyValue) =>
      !phone_m || !id_type || !id_no,
    []
  );

  const { runQuery: fetchOldPatientData, loading: patientDataLoading } =
    useBasicQuery({
      apiId: "QUERY_PATIENT_OLD_DATA",
      callOnFirstRender: false,
      onResponse: handlePatientDataResponse,
      skipQuery: skipPatientDataQuery,
      params: {
        id_no: initialIdNo,
        id_type: initialIdType,
        phone_m: initialIdPhone,
      },
    });

  const { loading: isStillCancelingAppointment, mutate: cancelAppointment } =
    useBasicMutation({
      apiId: "PUT_CANCEL_PATIENT_BOOKING",
      method: "put",
    });

  const {
    type: bookingApiStatus,
    message: bookingApiMessage,
    shouldCloseMainModalIfApplicable,
  } = bookingResultModalState;

  const handleCloseBookingApiModal = useCallback(() => {
    setBookingResultModalState(initialBookingApiDoneResults);

    if (bookingApiStatus === "success") {
      if (shouldCloseMainModalIfApplicable) {
        onClose();
      }
      onBookingDoneSuccessfully?.();
    }
  }, [
    onBookingDoneSuccessfully,
    onClose,
    bookingApiStatus,
    shouldCloseMainModalIfApplicable,
  ]);

  const handleCancelBooking = useCallback(
    (appointmentId: number) => () => {
      const body = {
        appointment_id: appointmentId,
        newFollowup: "N",
        cancel_reason: "589",
      };

      cancelAppointment({
        body,
        cb: ({ apiValues: { status }, error }) => {
          const isSuccess = status === "success";
          if (isSuccess) {
            handleChange({
              name: "previousReservations",
              value: previousReservations.filter(
                ({ appointment_id }) => appointmentId !== appointment_id
              ),
            });
          }

          setBookingResultModalState({
            type: status,
            message: isSuccess ? "donsucesfly" : error || "flssve",
            shouldCloseMainModalIfApplicable: false,
          });
        },
      });
    },
    [
      cancelAppointment,
      setBookingResultModalState,
      handleChange,
      previousReservations,
    ]
  );

  const handleSearchPatientData = useCallback(() => {
    handleChangeMultipleInputs({
      showPatientDataForm: false,
      isPatientNotFound: false,
    });
    fetchOldPatientData({
      id_no,
      id_type,
      phone_m,
    });
  }, [
    fetchOldPatientData,
    id_type,
    id_no,
    phone_m,
    handleChangeMultipleInputs,
  ]);

  const handleClearSearchData = useCallback(
    () => handleChangeMultipleInputs(FORM_INITIAL_VALUES),
    [handleChangeMultipleInputs]
  );

  const onShowPatientDataForm = useCallback(
    () =>
      handleChange({
        name: "showPatientDataForm",
        value: true,
      }),
    [handleChange]
  );

  return (
    <>
      <Modal
        width="743px"
        visible={visible}
        onClose={onClose}
        title="bokapntmnt"
        bodyPadding={spacing4}
        maskClosable={false}
        onOk={handleSubmit}
        okText={onlyUsePatientView ? "done" : "book"}
        loading={loading}
        disabled={
          loading ||
          !patient_name_p ||
          !patient_name_2_p ||
          !showPatientDataForm
        }
      >
        <Flex width="100%" gap={spacing4} wrap="true">
          {!onlyUsePatientView && (
            <>
              <Text
                fontSize="ff7"
                margin={bookingInfoTextMargin}
                colors={appPrimary}
              >
                bokinginfo
              </Text>

              <Flex
                width="100%"
                bordered
                gap={spacing4}
                wrap="true"
                padding={spacing4}
                margin={bookingInfoCardMargin}
              >
                <Image
                  src={doctorImageUrl || ""}
                  alt="clinical"
                  height="sp16"
                  width="sp16"
                  borderRadius="4px"
                />
                <Flex gap={spacing4} wrap="true" column="true" flex={1}>
                  <Text
                    disableTranslation
                    children={clinicalName}
                    fontSize="ff8"
                    weight="700"
                    lines={3}
                  />
                  <Text
                    children={`__t__bookngdte : ${bookingDate}`}
                    fontSize="ff9"
                    weight="400"
                  />
                  <Text
                    children={`__t__bokngtim : ${bookingTime}`}
                    fontSize="ff9"
                    weight="400"
                  />
                </Flex>
              </Flex>
            </>
          )}

          {isPatientNotFound && (
            <Text
              children="ptntntfound"
              fontSize="ff8"
              weight="700"
              color="red"
              margin="8px 0"
              align="center"
              width="100%"
            />
          )}
          <Flex width="100%" gap={spacing4} align="center" wrap="true">
            <Flex width="100%" gap={spacing4} align="center" wrap="true">
              <InputField
                label="idnum"
                error={errors?.id_no}
                name="id_no"
                value={id_no}
                width={spacing18}
                onChange={handleChange}
                valueMatchPattern="/\d/g"
                disabled={patientDataLoading}
              />

              <SelectWithApiQuery
                label="idtyp"
                width={spacing19}
                error={errors?.id_type}
                apiOrCodeId="ID_TYPES"
                queryType="u_code"
                name="id_type"
                value={id_type}
                onChange={handleChange}
                enableNetworkCache
                disabled={patientDataLoading}
              />

              <InputField
                name="phone_m"
                label="mbln"
                value={phone_m}
                width={spacing19}
                onChange={handleChange}
                error={errors?.phone_m}
                valueMatchPattern="/\d/g"
                disabled={patientDataLoading}
              />

              <Button
                type="primary"
                label="srch"
                disabled={patientDataLoading}
                loading={patientDataLoading}
                onClick={handleSearchPatientData}
              />

              {!showPatientDataForm && (
                <Button
                  type="primary"
                  label="rgstr"
                  disabled={patientDataLoading}
                  loading={patientDataLoading}
                  onClick={onShowPatientDataForm}
                />
              )}

              <Button
                type="primary"
                label="clr"
                disabled={!patient_name_p || patientDataLoading}
                loading={patientDataLoading}
                onClick={handleClearSearchData}
              />
            </Flex>

            {showPatientDataForm && (
              <>
                <InputField
                  name="patient_name_p"
                  label="frstnme"
                  width={spacing22}
                  value={patient_name_p}
                  onChange={handleChange}
                  error={errors?.patient_name_p}
                  valueMatchPattern={valueMatchPattern}
                  upperCaseFirstCharacter
                  disabled={patientDataLoading}
                />
                <InputField
                  name="patient_name_2_p"
                  label="scndnme"
                  width={spacing22}
                  value={patient_name_2_p}
                  onChange={handleChange}
                  error={errors?.patient_name_2_p}
                  valueMatchPattern={valueMatchPattern}
                  upperCaseFirstCharacter
                  disabled={patientDataLoading}
                />
                <InputField
                  name="patient_name_3_p"
                  label="thrdnme"
                  width={spacing22}
                  value={patient_name_3_p}
                  onChange={handleChange}
                  error={errors?.patient_name_3_p}
                  valueMatchPattern={valueMatchPattern}
                  upperCaseFirstCharacter
                  disabled={patientDataLoading}
                />
                <InputField
                  name="patient_name_f_p"
                  label="fmlynme"
                  width={spacing22}
                  value={patient_name_f_p}
                  onChange={handleChange}
                  error={errors?.patient_name_f_p}
                  valueMatchPattern={valueMatchPattern}
                  upperCaseFirstCharacter
                  disabled={patientDataLoading}
                />
              </>
            )}
          </Flex>

          {showPatientDataForm && (
            <>
              <InputField
                customInputComponent={StyledDateInput}
                name="date_of_birth"
                type="date"
                width={spacing22}
                label="dob"
                value={date_of_birth}
                error={errors?.date_of_birth}
                onChange={handleChange}
                forceFloatingLabel
                min={minimumBirthDate}
                max={maximumBirthDate}
                disabled={patientDataLoading}
              />

              <SelectWithApiQuery
                label="gndr"
                width={spacing22}
                error={errors?.gender}
                apiOrCodeId="GENDER_TYPES"
                queryType="u_code"
                name="gender"
                value={gender}
                onChange={handleChange}
                enableNetworkCache
                disabled={patientDataLoading}
              />
              <SelectWithApiQuery
                label="whrfindus"
                width={`calc(${spacing32} * 1.3)`}
                apiOrCodeId="WHERE_TO_FIND_TYPES"
                queryType="u_code"
                name="where_find"
                value={where_find}
                onChange={handleChange}
                enableNetworkCache
                disabled={patientDataLoading}
              />
            </>
          )}
        </Flex>

        {!!previousReservations?.length && (
          <>
            <Text
              fontSize="ff7"
              color={colors.appPrimary}
              margin={`${spacings.sp4} 0`}
            >
              bokngs
            </Text>
            <StyledTable>
              <thead>
                <tr>
                  <BaseText tag="th">date</BaseText>
                  <BaseText tag="th">clincal</BaseText>
                  <BaseText tag="th">docnam</BaseText>
                  <BaseText tag="th">action</BaseText>
                </tr>
              </thead>

              <tbody>
                {previousReservations.map(
                  ({
                    appointment_id,
                    bookingDate,
                    bookingNo,
                    clinical,
                    doctor_name,
                  }) => (
                    <tr key={appointment_id}>
                      <td>{`${bookingDate} ${bookingNo || ""}`}</td>
                      <td>{clinical}</td>
                      <td>{doctor_name}</td>
                      <td>
                        <Flex width="100%" align="center" justify="center">
                          <Button
                            height="25px"
                            type="danger"
                            icon={<DeleteIcon />}
                            onClick={handleCancelBooking(appointment_id)}
                            loading={isStillCancelingAppointment}
                            disabled={isStillCancelingAppointment}
                          />
                        </Flex>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </StyledTable>
          </>
        )}
      </Modal>
      {!!bookingApiMessage && (
        <Modal
          visible={!!bookingApiMessage}
          title="info"
          width={spacing27}
          onClose={handleCloseBookingApiModal}
          noCancelButton
          bodyMinHeight="20px"
        >
          <Text
            children={bookingApiMessage}
            color={bookingApiStatus !== "success" ? red : lightGreen}
            width="99%"
            align="center"
            fontSize="ff8"
            margin={serverTextMargin}
          />
        </Modal>
      )}
    </>
  );
};

export default memo(BookingModal);
