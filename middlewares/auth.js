const Headers = require("../utils/constants").headers;
const Errors = require("../utils/constants").errors;
const JWTHandler = require("../core/jwt");

function _sendError(message, error, res) {
  return res.status(401).json({
    status: Errors.FAILED,
    message: message,
    error: error,
  });
}

/* 
  accessToken validation middleware
   - handles expiry of access token, in this case the user has to get a new access token
   - if the access token is not valid, then Bad request status code is sent back
*/
module.exports.checkAndvalidateAccessToken = (req, res, next) => {
  if (!req.header(Headers.AUTHORIZATION_HEADER)) {
    return _sendError(Errors.UNAUTHORIZED, Errors.SPECIFY_VALID_HEADER, res);
  }

  const authHeader = req
    .header(Headers.AUTHORIZATION_HEADER)
    .toString()
    .split(" ");

  // accept only if Auth type is Bearer
  if (authHeader == null || authHeader[0] !== Headers.BEARER) {
    return res.status(403).json({
      status: Errors.FAILED,
      message: Errors.INVALID_AUTH_TYPE,
    });
  }

  if (authHeader[1]) {
    req.accessToken = authHeader[1];
    const verificationResult = JWTHandler.verifyAccessToken(
      req.accessToken
    );
    // if valid, move to next step
    if (verificationResult.valid) { // TODO remove
      req.tokenData = verificationResult.data;
      next();
      return;
    }

    console.log(`error: ${verificationResult.error}`)

    // check if expired
    if (verificationResult.error.toString().includes(Headers.EXPIRED)) {
      return res.status(401).json({
        status: Errors.FAILED,
        message: Errors.ACCESS_TOKEN_EXPIRED,
      });
    }
  }

  return _sendError(Errors.INVALID_TOKEN, Errors.SPECIFY_VALID_TOKEN, res);
};