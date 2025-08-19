/*
 *
 * Component: `AppConfigProvider`.
 *
 */
import { useState, useLayoutEffect } from "react";
import {
  LANGUAGE_DIRS,
  LanguageValuesType,
} from "@exsys-clinio/global-app-constants";
import { getItemFromStorage } from "@exsys-clinio/helpers";
import { getRequest } from "@exsys-clinio/refetch";
import { AppConfigStateType } from "@exsys-clinio/types";
import Store, { initialState, baseClientConfigData } from "../context";

const AppConfigProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [state, setContext] = useState<AppConfigStateType>(initialState);

  useLayoutEffect(() => {
    const mainStoreData = getItemFromStorage<AppConfigStateType>("mainStore");

    const { languageId, authorization } = mainStoreData;

    if (mainStoreData) {
      document.body.setAttribute(
        "dir",
        LANGUAGE_DIRS[languageId as LanguageValuesType]
      );

      (async () => {
        try {
          const { data, error } = await getRequest({
            // "http://136.243.62.235:9090/ords/exsys_api/ex_web_patient_booking/ex_booking_website_setup?authorization=111111";
            apiResource: "ex_web_patient_booking/ex_booking_website_setup",
            params: {
              authorization,
            },
          });

          if (error) {
            console.log("Error when loading client config", error);
            setContext(() => mainStoreData);

            return;
          }

          setContext((previous) => ({
            ...previous,
            ...mainStoreData,
            ...baseClientConfigData,
            ...data,
          }));
        } catch (error) {
          setContext(() => mainStoreData);
          console.log("client config data not loaded", error);
        }
      })();
    }
  }, []);

  console.log("state", state);

  return (
    <Store.Provider
      value={{
        state,
        setAuthValues: setContext,
      }}
    >
      {children}
    </Store.Provider>
  );
};

export default AppConfigProvider;
