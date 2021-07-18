require("dotenv").config();

module.exports = Object.freeze({
    AUTH_SERVICE: process.env.AUTH_SERVICE || "http://localhost:6000",
    CUSTOMER_SERVICE: process.env.CUSTOMER_SERVICE || "http://localhost:7000",
    ORDER_SERVICE: process.env.ORDER_SERVICE || "http://localhost:10000",
    PRODUCT_SERVICE: process.env.PRODUCT_SERVICE || "http://localhost:8000",
    PAYMENT_SERVICE: process.env.PAYMENT_SERVICE || "http://localhost:9000",
  });
  