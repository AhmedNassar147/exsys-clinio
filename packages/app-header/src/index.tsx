/*
 *
 * Package: `@exsys-clinio/app-header`.
 *
 */
import { memo, useCallback } from "react";
import LanguageSelectField, {
  LANGUAGE_SELECT_FIELD_NAME,
} from "@exsys-clinio/language-select-field";
import {
  useLanguageSwitcher,
  useMakeSelectCurrentLanguageId,
} from "@exsys-clinio/app-config-store";
import useFormManager from "@exsys-clinio/form-manager";
import { spacings, colors } from "@exsys-clinio/theme-values";
import { onChangeEvent } from "@exsys-clinio/types";
import { StyledHeader } from "./styled";

const AppHeader = () => {
  const { values, handleChange } = useFormManager({
    initialValues: {
      [LANGUAGE_SELECT_FIELD_NAME]: useMakeSelectCurrentLanguageId(),
    },
  });

  const handleLanguageSwitched = useLanguageSwitcher();

  const onChange: onChangeEvent<number> = useCallback(
    (event) => {
      handleChange(event);
      const { value } = event;
      handleLanguageSwitched(value);
    },
    [handleChange, handleLanguageSwitched]
  );

  return (
    <StyledHeader>
      <LanguageSelectField
        width={spacings.sp15}
        label=""
        usePortal
        onChange={onChange}
        value={values[LANGUAGE_SELECT_FIELD_NAME]}
        allowClear={false}
        backgroundColor={colors.appPrimary}
        color={colors.white}
      />
    </StyledHeader>
  );
};

export default memo(AppHeader);
