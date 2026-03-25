/*
 *
 * Package: `@exsys-clinio/app-header`.
 *
 */
import { memo, useCallback, useMemo } from "react";
import Flex from "@exsys-clinio/flex";
import LanguageSelectField, {
  LANGUAGE_SELECT_FIELD_NAME,
} from "@exsys-clinio/language-select-field";
import {
  useLanguageSwitcher,
  useMakeSelectCurrentLanguageId,
  useClientSettings,
} from "@exsys-clinio/app-config-store";
import useFormManager from "@exsys-clinio/form-manager";
import { spacings, colors } from "@exsys-clinio/theme-values";
import { onChangeEvent, QueryResponseValuesType } from "@exsys-clinio/types";
import { useBasicQuery } from "@exsys-clinio/network-hooks";
import HomeIcon from "@exsys-clinio/home-icon";
import { StyledHeader, StyledLink, StyledLogo } from "./styled";
import { INITIAL_VALUES } from "./constants";

const AppHeader = () => {
  const { values, handleChange, handleChangeMultipleInputs } = useFormManager({
    initialValues: {
      ...INITIAL_VALUES,
      [LANGUAGE_SELECT_FIELD_NAME]: useMakeSelectCurrentLanguageId(),
    },
  });

  const { site_logo, web_url } = values;

  const handleLanguageSwitched = useLanguageSwitcher();

  const onChange: onChangeEvent<number> = useCallback(
    (event) => {
      handleChange(event);
      const { value } = event;
      handleLanguageSwitched(value);
    },
    [handleChange, handleLanguageSwitched]
  );
  const { headerHeight } = useClientSettings();

  const handleApiRequest = useCallback(
    ({ apiValues }: QueryResponseValuesType) => {
      const data = apiValues.data?.[0];
      if (data) {
        handleChangeMultipleInputs({
          web_url: data.web_url || "",
          site_logo: data.site_logo || "",
        });
      }
    },
    [handleChangeMultipleInputs]
  );
  useBasicQuery({
    apiId: "QUERY_ORGANIZATION_INFORMATION_DATA",
    callOnFirstRender: true,
    onResponse: handleApiRequest,
  });

  const externalLinks = useMemo(
    () => [site_logo, web_url],
    [site_logo, web_url]
  );

  return (
    <StyledHeader headerHeight={headerHeight}>
      <Flex gap="20px" align="center" justify="center">
        <StyledLogo
          headerLogoHeight={headerHeight}
          src={`data:image/jpg;base64,${externalLinks[0]}`}
        />
        <StyledLink
          key="home"
          href={externalLinks[1] || "#"}
          target="_blank"
          rel="noreferrer"
        >
          <HomeIcon width="22px" height="22px" color={colors.alhokamaPrimary} />
        </StyledLink>
      </Flex>

      <LanguageSelectField
        width={spacings.sp15}
        label=""
        usePortal
        onChange={onChange}
        value={values[LANGUAGE_SELECT_FIELD_NAME]}
        allowClear={false}
        backgroundColor={colors.alhokamaTertiary}
        color={colors.alhokamaPrimary}
      />
    </StyledHeader>
  );
};

export default memo(AppHeader);
