/*
 *
 * Package: `@exsys-clinio/app-footer`.
 *
 */
import { memo } from "react";
import { StyledFooter, FooterImage } from "./styled";
import exsysIcon from "./assets/exsys.svg";
import curePlusIcon from "./assets/curePlus.svg";

const ENV = process.env;

const AppFooter = () => (
  <StyledFooter>
    <FooterImage src={curePlusIcon} alt="cureplus-icon" />
    <b>Powered by Exsys Solutions inc</b>
    <FooterImage src={exsysIcon} alt="exsys-icon" />
    <label>
      Release {ENV.REACT_APP_BUILD_YEAR}.{ENV.REACT_APP_BUILD_MONTH}.
      {ENV.REACT_APP_BUILD_DAY}.{ENV.REACT_APP_BUILD_TIME}
    </label>
  </StyledFooter>
);

export default memo(AppFooter);
