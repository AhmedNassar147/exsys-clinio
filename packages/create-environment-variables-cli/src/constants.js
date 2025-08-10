/*
 *
 * Constants: `@exsys-clinio/create-environment-variables-cli`.
 *
 */
const { sharedHelperKey } = require("../../command-line-utils");
const scriptName = "create-env-vars";

const CUSTOM_CRA_ENV_KEYS = {
  BUILD_YEAR: "REACT_APP_BUILD_YEAR",
  BUILD_MONTH: "REACT_APP_BUILD_MONTH",
  BUILD_DAY: "REACT_APP_BUILD_DAY",
  BUILD_TIME: "REACT_APP_BUILD_TIME",
  BASE_URL: "REACT_APP_BASE_URL",
  API_URL: "REACT_APP_API_URL",
  CLIENT_KEY: "REACT_APP_CLIENT_KEY",
};

const CLIENTS_NAMES = {
  cloud: "cloud",
};

const CLIENTS_NAMES_KEYS = Object.keys(CLIENTS_NAMES);

const CLIENTS_URLS = {
  [CLIENTS_NAMES.cloud]: "http://136.243.62.235",
};

const DEFAULT_CLI_OPTIONS = {
  https: false,
  production: false,
  clientName: CLIENTS_NAMES.cloud,
  sourcemap: false,
  serverPort: "2665",
  clientKey: "H",
  // serverPort: "9090",
};

const cliOptions = {
  scriptName,
  description: "create environment variables",
  helpersKeys: [
    sharedHelperKey,
    {
      keyOrKeys: "https",
      description: "use secured endpoints. (--https)",
    },
    {
      keyOrKeys: "cert-path",
      description:
        "set the secured site certificate path. (--cert-path=exsysLocalRootCert.pem)",
    },
    {
      keyOrKeys: "cert-key-path",
      description:
        "set the secured site certificate key. (--cert-key-path=exsysLocalKey.pem)",
    },
    {
      keyOrKeys: "production",
      description:
        "create environment variables for production build. (--production)",
    },
    {
      keyOrKeys: "sourcemap",
      description: "include build sourcemap. (--sourcemap)",
    },
    {
      keyOrKeys: "client-name",
      description: `set client endpoints urls. (--client-name=${DEFAULT_CLI_OPTIONS.clientName})`,
    },
    {
      keyOrKeys: "server-port",
      description: `set endpoints server port. (--server-port=${DEFAULT_CLI_OPTIONS.serverPort})`,
    },
  ],
};

module.exports = {
  cliOptions,
  CUSTOM_CRA_ENV_KEYS,
  CLIENTS_NAMES,
  CLIENTS_NAMES_KEYS,
  CLIENTS_URLS,
  DEFAULT_CLI_OPTIONS,
};
