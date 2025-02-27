/*
 *
 *
 * Package: `@exsys-clinio/doctors-search-results-list`.
 *
 */
import { memo } from "react";
import Image from "@exsys-clinio/image";
import Text from "@exsys-clinio/text";
import { colors } from "@exsys-clinio/theme-values";
import DoctorSessionsView from "@exsys-clinio/doctor-sessions-view";
import { InitialPatientDataType } from "@exsys-clinio/types";
import TimeIcon from "./TimeIcon";
import EarplugIcon from "./EarplugIcon";
import TextWithIcon from "./TextWithIcon";
import {
  DoctorInfoContainerWrapper,
  DoctorInfoWrapper,
  AllDoctorInfoWrapper,
} from "../styled";
import { DoctorInfoType } from "../index.interface";

interface DoctorInfoViewProps {
  periodType: string;
  doctorInfo: DoctorInfoType;
  organizationNo: string;
  currentPatientData: InitialPatientDataType;
}

const DoctorInfoView = ({
  periodType,
  organizationNo,
  currentPatientData,
  doctorInfo: {
    image_id,
    clinical_name,
    about_doctor,
    clinic_time,
    clinical_entity_no,
    session_code,
    seniority_level,
    specialty_name,
  },
}: DoctorInfoViewProps) => (
  <DoctorInfoContainerWrapper>
    <AllDoctorInfoWrapper>
      <Image
        src={image_id}
        alt="doc"
        height="sp20"
        width="sp20"
        borderRadius="4px"
      />
      <DoctorInfoWrapper>
        <Text
          disableTranslation
          children={clinical_name}
          fontSize="ff8"
          weight="700"
          lines={3}
        />

        <TextWithIcon
          icon={EarplugIcon}
          disableTranslation
          textValue={about_doctor}
          color={colors.black2}
          lines={6}
        />

        {clinic_time && (
          <TextWithIcon
            icon={TimeIcon}
            disableTranslation
            textValue={clinic_time}
            color={colors.lightGreen}
            fontSize="ff9"
            weight="400"
            lines={2}
          />
        )}

        <Text
          children={`${seniority_level || ""} - ${specialty_name || ""}`}
          fontSize="ff8"
          weight="400"
          disableTranslation
        />
      </DoctorInfoWrapper>
    </AllDoctorInfoWrapper>
    <DoctorSessionsView
      periodType={periodType}
      clinicalEntityNo={clinical_entity_no}
      sessionCode={session_code}
      doctorImageUrl={image_id}
      clinicalName={clinical_name}
      organizationNo={organizationNo}
      currentPatientData={currentPatientData}
    />
  </DoctorInfoContainerWrapper>
);

export default memo(DoctorInfoView);
