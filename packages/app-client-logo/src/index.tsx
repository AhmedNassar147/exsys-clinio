/*
 *
 * Package: `@exsys-clinio/app-client-logo`.
 *
 */
import { useCallback, memo, useState } from "react";
import { useBasicQuery } from "@exsys-clinio/network-hooks";
import { QueryResponseValuesType } from "@exsys-clinio/types";
import { ClientLogoImg, ClientLogoImgProps } from "./styled";

interface AppClientLogoProps extends ClientLogoImgProps {
  enableNetworkCache?: boolean;
}

const AppClientLogo = ({
  enableNetworkCache,
  ...props
}: AppClientLogoProps) => {
  const [clientLogoUrl, setClientLogo] = useState("");

  const onResponse = useCallback(
    ({ apiValues: { client_logo } }: QueryResponseValuesType) => {
      setClientLogo(() => client_logo || "");
    },
    []
  );

  useBasicQuery({
    apiId: "QUERY_CLIENT_LOGO",
    callOnFirstRender: true,
    runQueryWhenLanguageChanged: false,
    onResponse,
    excludeAuthorization: true,
    enableNetworkCache,
  });

  if (!clientLogoUrl) {
    return null;
  }

  return <ClientLogoImg src={clientLogoUrl} alt="client logo" {...props} />;
};

export default memo(AppClientLogo);
