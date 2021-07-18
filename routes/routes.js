const router = require("express").Router();
const AuthMiddlewares = require("../middlewares/auth");
const proxyEndpoints = require("../utils/constants").proxyEndpoints;
const httpProxy = require('express-http-proxy')

router.use("/api/auth/", httpProxy(proxyEndpoints.AUTH_SERVICE));

router.use(AuthMiddlewares.checkAndvalidateAccessToken);

router.use("/api/customer/", httpProxy(proxyEndpoints.CUSTOMER_SERVICE));

router.use("/api/order/", httpProxy(proxyEndpoints.ORDER_SERVICE));

router.use("/api/product/", httpProxy(proxyEndpoints.PRODUCT_SERVICE));

router.use("/api/payment/", httpProxy(proxyEndpoints.PAYMENT_SERVICE));

// handle invalid routes
router.use(function (_, res, __) {
  res.status(404).send({ error: "Route not found" });
  return;
});

module.exports = router;