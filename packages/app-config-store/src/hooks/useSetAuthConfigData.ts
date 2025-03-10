/*
 *
 * Hook: `useSetAuthConfigData`.
 *
 */
import { useCallback } from "react";
import { setItemToStorage } from "@exsys-clinio/helpers";
import { AppConfigStateType } from "@exsys-clinio/types";
import useAppConfigStore from "./useAppConfigStore";

const useSetAuthConfigData = () => {
  const { setAuthValues } = useAppConfigStore();

  return useCallback(
    (values: AppConfigStateType) =>
      setAuthValues((previous: AppConfigStateType) => {
        const nextMainStoreData = {
          ...previous,
          ...values,
        };

        setItemToStorage("mainStore", nextMainStoreData);

        return nextMainStoreData;
      }),
    [setAuthValues]
  );
};

export default useSetAuthConfigData;
