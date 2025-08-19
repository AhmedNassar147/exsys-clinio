/*
 *
 * Package: `@exsys-clinio/doctors-search-form`.
 *
 */
import { memo, useCallback, useMemo } from "react";
import SelectWithApiQuery from "@exsys-clinio/select-with-api-query";
import SelectionCheckGroup from "@exsys-clinio/selection-check-group";
import Button from "@exsys-clinio/button";
import Image from "@exsys-clinio/image";
import Flex from "@exsys-clinio/flex";
import Text from "@exsys-clinio/text";
import { convertInputDateToNormalFormat } from "@exsys-clinio/helpers";
import { onChangeEvent } from "@exsys-clinio/types";
import { MenuItemsDataSourceItemType } from "@exsys-clinio/menu-items";
import { DoctorsFormWrapper } from "./styled";
import { PERIOD_OPTIONS, INITIAL_FORM_STATE } from "./constants";

interface DoctorsSearchFormProps {
  onSearch: () => void;
  loading?: boolean;
  values: typeof INITIAL_FORM_STATE;
  handleChange: onChangeEvent;
}

const DoctorsSearchForm = ({
  onSearch,
  loading,
  values,
  handleChange,
}: DoctorsSearchFormProps) => {
  const {
    specialty_no,
    period_type,
    organization_no,
    clinical_entity_no,
    currentPatientData,
  } = values;

  const { date_of_birth } = currentPatientData;

  const dob = useMemo(
    () => (date_of_birth ? convertInputDateToNormalFormat(date_of_birth) : ""),
    [date_of_birth]
  );

  const renderItem = useCallback((option: MenuItemsDataSourceItemType) => {
    const {
      value,
      // @ts-ignore
      image_id,
    } = option || {};

    return (
      <Flex width="100%" gap="8px" align="center" margin="0px 0px 5px 0px">
        <Image
          src={image_id}
          alt="doc_logo"
          height="sp6"
          width="sp6"
          borderRadius="4px"
        />
        <Text fontSize="ff9">{value}</Text>
      </Flex>
    );
  }, []);

  return (
    <DoctorsFormWrapper>
      <SelectWithApiQuery
        queryType="query"
        apiOrCodeId="QUERY_ORGANIZATION_LIST"
        name="organization_no"
        label="rgzntn"
        width="100%"
        value={organization_no}
        allowClear
        onChange={handleChange}
        className="organization-input"
      />
      <SelectWithApiQuery
        queryType="query"
        apiOrCodeId="QUERY_CLINICAL_SPECIALTIES_LIST"
        name="specialty_no"
        label="spec"
        width="100%"
        value={specialty_no}
        onChange={handleChange}
        className="specialty-input"
        apiParams={{
          organization_no,
        }}
      />

      <SelectWithApiQuery
        queryType="query"
        apiOrCodeId="QUERY_DOCTORS_LIST"
        name="clinical_entity_no"
        label="docname"
        width="100%"
        value={clinical_entity_no}
        onChange={handleChange}
        className="specialty-input"
        renderItem={renderItem}
        apiParams={{
          specialty_no,
          dob,
        }}
      />

      <SelectionCheckGroup
        name="period_type"
        options={PERIOD_OPTIONS}
        value={period_type}
        mode="radio"
        width="auto"
        onChange={handleChange}
        className="period-input"
      />

      <Button
        label="srch"
        type="primary"
        onClick={onSearch}
        loading={loading}
        disabled={loading}
        className="search-button"
      />
    </DoctorsFormWrapper>
  );
};

export default memo(DoctorsSearchForm);
export { INITIAL_FORM_STATE };
