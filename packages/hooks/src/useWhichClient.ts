/*
 *
 * Hook: `useWhichClient`.
 *
 */
import { CLIENT_NAME_KEYS } from "@exsys-clinio/global-app-constants";

const useWhichClient = () => {
  const clientKey = process.env.REACT_APP_CLIENT_KEY;

  return {
    IS_HOKMAA: clientKey === CLIENT_NAME_KEYS.H,
  };
};

export default useWhichClient;
