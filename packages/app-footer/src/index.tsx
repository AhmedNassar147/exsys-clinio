/*
 *
 * Package: `@exsys-clinio/app-footer`.
 *
 */
import { memo, useCallback, useMemo } from "react";
import Flex from "@exsys-clinio/flex";
import { useClientSettings } from "@exsys-clinio/app-config-store";
import TiktokIcon from "@exsys-clinio/tiktok-icon";
import WhatsappIcon from "@exsys-clinio/whatsapp-icon";
import youtubeIcon from "@exsys-clinio/youtube-icon";
import TwitterIcon from "@exsys-clinio/twitter-icon";
import InstagramIcon from "@exsys-clinio/instagram-icon";
import FacebookIcon from "@exsys-clinio/facebook-icon";
import {
  StyledFooter,
  FooterImage,
  StyledLink,
  StyledParagraph,
} from "./styled";
import exsysIcon from "./assets/exsys.svg";
import curePlusIcon from "./assets/curePlus.svg";
import { colors } from "@exsys-clinio/theme-values";
import { useBasicQuery } from "@exsys-clinio/network-hooks";
import useFormManager from "@exsys-clinio/form-manager";

import { QueryResponseValuesType } from "@exsys-clinio/types";
import { INITIAL_VALUES } from "./constants";

const ENV = process.env || {};

const AppFooter = () => {
  // @ts-ignore
  const { footerBackgroundImageUrl, footerHeight } = useClientSettings();
  const { values, handleChangeMultipleInputs } = useFormManager({
    initialValues: {
      ...INITIAL_VALUES,
    },
  });

  const { twitter_site, instgram, youtube, tiktok, whatsapp, facebook_site } =
    values;

  const handleApiRequest = useCallback(
    ({ apiValues }: QueryResponseValuesType) => {
      const data = apiValues.data?.[0];
      if (data) {
        handleChangeMultipleInputs({
          twitter_site: data?.twitter_site,
          instgram: data?.instgram,
          youtube: data?.youtube,
          tiktok: data?.tiktok,
          whatsapp: data?.whatsapp,
          facebook_site: data?.facebook_site,
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

  const iconsArray = useMemo(
    () => [
      {
        Icon: TiktokIcon,
        color: colors.alhokamaPrimary,
        link: tiktok,
        id: "1",
      },
      {
        Icon: WhatsappIcon,
        color: colors.alhokamaPrimary,
        link: whatsapp,
        id: "2",
      },
      {
        Icon: youtubeIcon,
        color: colors.alhokamaPrimary,
        link: youtube,
        id: "3",
      },
      {
        Icon: TwitterIcon,
        color: colors.alhokamaPrimary,
        link: twitter_site,
        id: "4",
      },
      {
        Icon: InstagramIcon,
        color: colors.alhokamaPrimary,
        link: instgram,
        id: "5",
      },
      {
        Icon: FacebookIcon,
        color: colors.alhokamaPrimary,
        link: facebook_site,
        id: "6",
      },
    ],
    [tiktok, whatsapp, youtube, twitter_site, instgram]
  );

  const exsysFooter = (
    <>
      <FooterImage src={curePlusIcon} alt="cureplus-icon" />
      <StyledParagraph>Powered by Exsys Solutions inc</StyledParagraph>
      <FooterImage src={exsysIcon} alt="exsys-icon" />
      <StyledParagraph>
        Release {ENV.REACT_APP_BUILD_YEAR}.{ENV.REACT_APP_BUILD_MONTH}.
        {ENV.REACT_APP_BUILD_DAY}.{ENV.REACT_APP_BUILD_TIME}
      </StyledParagraph>
    </>
  );

  return (
    <StyledFooter
      footerHeight={footerHeight}
      footerBackgroundImageUrl={footerBackgroundImageUrl}
    >
      {!!footerBackgroundImageUrl ? (
        <Flex align="center" justify="center" column="true" width="100%">
          <Flex
            width="100%"
            gap="40px"
            align="center"
            justify="center"
            minHeight="200px"
            maxHeight="200px"
          >
            {iconsArray.map(
              ({ id, link, Icon, color }) =>
                link && (
                  <StyledLink
                    key={id}
                    href={link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Icon width="42px" height="42px" color={color} />
                  </StyledLink>
                )
            )}
          </Flex>
          <Flex width="100%" gap="8px" align="center" justify="center">
            {exsysFooter}
          </Flex>
        </Flex>
      ) : (
        exsysFooter
      )}
    </StyledFooter>
  );
};

export default memo(AppFooter);
