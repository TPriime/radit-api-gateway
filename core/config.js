require("dotenv").config();

const PROD_KEY = "prod";
const DEV_KEY = "dev";
const TEST_KEY = "test";

const EXPRESS_CONFIG = Object.freeze({
  MAX_REQ_BODY_SIZE: "200kb",
  PUBLIC_DIRECTORY: "../public",
});

const dev = {
  name: DEV_KEY,
  app: {
    port: process.env.PORT || 9000,
  },
};

const test = {
  name: TEST_KEY,
  app: {
    port: process.env.PORT || 9000,
  },
};

const prod = {
  name: PROD_KEY,
  app: {
    port: process.env.PORT || 9000,
  },
};

const config = {
  dev,
  test,
  prod,
};

// 'dev' or 'test' or 'prod'
const env = _getEnvironment();

// pulls the [NODE_ENV] string from .env and creates environment config file
// if no valid env string is placed in .env then dev environment will be choosen as default
function _getEnvironment() {
  const tEnv = process.env.NODE_ENV;
  if (tEnv == PROD_KEY || tEnv == DEV_KEY || tEnv == TEST_KEY) return tEnv;
  console.log(
    "[Warning]: Invalid environment config in .env for key NODE_ENV\nPicking dev environment for running server"
  );
  return DEV_KEY;
}

module.exports = config[env] || config[DEV_KEY];
module.exports.EXPRESS_CONFIG = EXPRESS_CONFIG;
