const admin = require("firebase-admin");
const cypressFirebasePlugin = require("cypress-firebase").plugin;

module.exports = (on, config) => {
  const extendingConfig = cypressFirebasePlugin(on, config, admin);

  return extendingConfig;
};
