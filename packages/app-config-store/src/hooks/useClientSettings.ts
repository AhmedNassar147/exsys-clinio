/*
 *
 * Hook: `useClientSettings`.
 *
 */
import useAppConfigStore from "./useAppConfigStore";

const useClientSettings = () => {
  const {
    state: {
      headerHeight,
      headerLogoHeight,
      footerHeight,
      footerBackgroundImageUrl,
      siteLogoUrl,
      hideGenderField,
      hideHoursAndSeniorityLevel,
      hideWhereFoundUsField,
    },
  } = useAppConfigStore();

  return {
    headerHeight,
    headerLogoHeight,
    siteLogoUrl,
    footerHeight,
    footerBackgroundImageUrl,
    hideGenderField: hideGenderField === "Y",
    hideHoursAndSeniorityLevel: hideHoursAndSeniorityLevel === "Y",
    hideWhereFoundUsField: hideWhereFoundUsField === "Y",
  };
};

export default useClientSettings;
