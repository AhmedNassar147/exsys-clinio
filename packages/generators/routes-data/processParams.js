/*
 *
 * `processParams`: `@exsys-clinio/generators`.
 *
 */
const getActualPathOrParam = require("./getActualPathOrParam");

function processParams(params) {
  const actualParams = getActualPathOrParam(params, "/:");

  return actualParams.toString().replace(/,/g, "");
}

module.exports = processParams;
