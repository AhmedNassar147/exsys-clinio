/*
 * Package : `@exsys-clinio/generators`.
 * Exports the generators so that `plop` knows them.
 */
const reactPackageGenerator = require("./react-package");
const normalPackageGenerator = require("./normal-package");
const defineReactComponentPlopHelpers = require("./utils/defineReactComponentPlopHelpers");
const definePlopActionsAfterPackageCreation = require("./utils/definePlopActionsAfterPackageCreation");
const definePageRouteRouteData = require("./utils/definePageRouteRouteData");
const defineBuildModalInHomePageAction = require("./utils/defineBuildModalInHomePageAction");

module.exports = (plop) => {
  // generators
  plop.setGenerator("react package", reactPackageGenerator);
  plop.setGenerator("other package", normalPackageGenerator);

  // react plop helpers
  defineReactComponentPlopHelpers(plop);
  definePageRouteRouteData(plop);
  defineBuildModalInHomePageAction(plop);

  // plop actions
  definePlopActionsAfterPackageCreation(plop);
};
