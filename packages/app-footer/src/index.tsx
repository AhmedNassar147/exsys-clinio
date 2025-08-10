/*
 *
 * Package: `@exsys-clinio/app-footer`.
 *
 */
import { memo } from "react";
import { useTheme } from "styled-components";
import Flex from "@exsys-clinio/flex";
import TiktokIcon from "@exsys-clinio/tiktok-icon";
import WhatsappIcon from "@exsys-clinio/whatsapp-icon";
import youtubeIcon from "@exsys-clinio/youtube-icon";
import TwitterIcon from "@exsys-clinio/twitter-icon";
import InstagramIcon from "@exsys-clinio/instagram-icon";
import { StyledFooter, FooterImage, StyledLink } from "./styled";
import exsysIcon from "./assets/exsys.svg";
import curePlusIcon from "./assets/curePlus.svg";

const ENV = process.env;

const iconsArray = [
  {
    Icon: TiktokIcon,
    link: "https://www.tiktok.com/@alhokama88",
    id: "1",
  },
  {
    Icon: WhatsappIcon,
    link: "https://wa.me/966114797777",
    id: "2",
  },
  {
    Icon: youtubeIcon,
    link: "https://www.youtube.com/user/alhokamachannel",
    id: "3",
  },
  {
    Icon: TwitterIcon,
    link: "https://twitter.com/ALHOKAMA",
    id: "4",
  },
  {
    Icon: InstagramIcon,
    link: "https://www.instagram.com/alhokama",
    id: "5",
  },
];

const AppFooter = () => {
  // @ts-ignore
  const { useCustomFooter } = useTheme();

  const exsysFooter = (
    <>
      <FooterImage src={curePlusIcon} alt="cureplus-icon" />
      <b>Powered by Exsys Solutions inc</b>
      <FooterImage src={exsysIcon} alt="exsys-icon" />
      <label>
        Release {ENV.REACT_APP_BUILD_YEAR}.{ENV.REACT_APP_BUILD_MONTH}.
        {ENV.REACT_APP_BUILD_DAY}.{ENV.REACT_APP_BUILD_TIME}
      </label>
    </>
  );

  return (
    <StyledFooter useCustomFooter={useCustomFooter}>
      {useCustomFooter ? (
        <Flex align="center" justify="center" column="true" width="100%">
          <Flex
            width="100%"
            gap="40px"
            align="center"
            justify="center"
            minHeight="200px"
            maxHeight="200px"
          >
            {iconsArray.map(({ id, link, Icon }) => (
              <StyledLink key={id} href={link} target="_blank" rel="noreferrer">
                <Icon width="42px" height="42px" color="currentColor" />
              </StyledLink>
            ))}
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
