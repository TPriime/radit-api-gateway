function log(req, _, next) { // TODO log to rabbit mq
    console.log(
      `\nReq: ${req.method} ${req.url} ${new Date().toString()} ${
        req.connection.remoteAddress
      }`
    );
    next();
    return;
};

module.exports = () => log