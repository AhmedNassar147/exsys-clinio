/*
 *
 * reactComponentUtils
 *
 */
const {
  REACT_PACKAGE_TYPES,
  REACT_PACKAGE_TYPES_KEYS
} = require("../constants");

const isReactComponentSelected = choiceProp => {
  const { type } = choiceProp || {};

  return REACT_PACKAGE_TYPES.includes(type);
};

const getTypeOfComponentPackage = type => {
  const result = {
    isNormal: false,
    isLazy: false,
    isPage: false
  };

  switch (type) {
    case REACT_PACKAGE_TYPES_KEYS.lazy:
      result.isLazy = true;
      break;

    case REACT_PACKAGE_TYPES_KEYS.page:
      result.isPage = true;
      break;

    default:
      result.isNormal = true;
      break;
  }

  return result;
};

module.exports = {
  isReactComponentSelected,
  getTypeOfComponentPackage
};
