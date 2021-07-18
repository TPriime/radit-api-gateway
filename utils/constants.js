require("dotenv").config();

module.exports = Object.freeze({
  headers: require("./constants/headers"),
  errors: require("./constants/error_messages"),
  successMessages: require("./constants/success_messages"),
  proxyEndpoints: require("./constants/proxy_endpoints")
});
