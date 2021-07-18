const printEnvDetails = require("./print_env");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const logger = require("../middlewares/logger");
const appRoutes = require("../routes/routes");

const YAML = require("yamljs");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = YAML.load("./utils/swagger/swagger.yaml");


function _configureServer(app) {
  console.log("Configuring server...");

  //  body parser
  app.use(express.json());
  app.use(helmet());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cors());

  // logs request to console
  console.log("Setting up request logging...");
  app.use(logger());

  // documentation
  app.use("/explorer", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  app.use(appRoutes);
}


module.exports.initServer = (app, appConfig) => {
  // setup the server before starting it
  _configureServer(app);

  console.log("Starting server...");
  app.listen(appConfig.app.port, (err) => {
    if (err) {
      // server run failed
      console.log(`Failed to listen on port ${appConfig.app.port}`);
      console.error(err);
      process.exit(1);
    } else {
      // server run success
      console.log(`Listening on port ${appConfig.app.port}`);
      printEnvDetails(appConfig);
    }
  });
};
