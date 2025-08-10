/*
 *
 * Package: `@exsys-clinio/create-environment-variables-cli`.
 *
 */
const { writeFile } = require("fs/promises");
const {
  createCliController,
  consoleColors,
} = require("../../command-line-utils");
const {
  cliOptions,
  CUSTOM_CRA_ENV_KEYS,
  DEFAULT_CLI_OPTIONS,
  CLIENTS_NAMES_KEYS,
  CLIENTS_URLS,
} = require("./constants");
const getBuildDates = require("./getBuildDates");
const getAppEnvPath = require("./getAppEnvPath");

const createEnvironmentVariablesFn = async (options) => {
  const {
    https,
    production,
    clientName,
    sourcemap,
    serverPort,
    certPath,
    certKeyPath,
    clientKey,
  } = {
    ...DEFAULT_CLI_OPTIONS,
    ...options,
  };

  if (!CLIENTS_NAMES_KEYS.includes(clientName)) {
    console.log(
      consoleColors.fg.red,
      `\nClient name must be one those clients ${CLIENTS_NAMES_KEYS.join(
        " , "
      )}\n`
    );

    process.exit(1);
  }

  if (isNaN(serverPort)) {
    console.log(consoleColors.fg.red, `\nServer port must be number\n`);

    process.exit(1);
  }

  const { year, month, day, time } = getBuildDates();
  const clientNameUrl = CLIENTS_URLS[clientName];
  let baseUrl = `${clientNameUrl}:${serverPort}`;

  if (!!https) {
    baseUrl = baseUrl.replace(/http:/, "https:");
  }

  const allEnvironmentVariables = {
    // native `CRA` env variables
    NODE_ENV: production ? "production" : "development",
    ...(production
      ? {
          GENERATE_SOURCEMAP: !!sourcemap,
        }
      : null),
    ...(!!https
      ? {
          HTTPS: true,
          SSL_CRT_FILE: `../certs/${certPath}`,
          SSL_KEY_FILE: `../certs/${certKeyPath}`,
        }
      : null),
    // custom `CRA` env variables
    [CUSTOM_CRA_ENV_KEYS.BUILD_YEAR]: year,
    [CUSTOM_CRA_ENV_KEYS.BUILD_MONTH]: month,
    [CUSTOM_CRA_ENV_KEYS.BUILD_DAY]: day,
    [CUSTOM_CRA_ENV_KEYS.BUILD_TIME]: time,
    [CUSTOM_CRA_ENV_KEYS.BASE_URL]: baseUrl,
    [CUSTOM_CRA_ENV_KEYS.API_URL]: `${baseUrl}/ords/exsys_api/`,
    [CUSTOM_CRA_ENV_KEYS.CLIENT_KEY]: clientKey || "S",
  };

  let envVariablesString = "";

  for (const key in allEnvironmentVariables) {
    envVariablesString += `${key}=${allEnvironmentVariables[key]}\n`;
  }

  await writeFile(getAppEnvPath(), envVariablesString);
};

createCliController({
  ...cliOptions,
  runCliFn: createEnvironmentVariablesFn,
});
