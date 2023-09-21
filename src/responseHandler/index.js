"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationErrorHandler = exports.authorizationErrorHandler = exports.authenticationErrorHandler = exports.requestErrorHandler = exports.successHandler = exports.dbErrorHandler = exports.routePrinter = void 0;
var index_js_1 = require("../validationHandler/index.js");
var logger_js_1 = require("../utils/logger.js");
var serverErrorMessage = 'Server error.';
var requestErrorMessage = 'Request error';
var dbErrorMessage = serverErrorMessage;
var successMessage = 'OK';
var authenticationErrorMessage = requestErrorMessage;
var authorizationErrorMessage = requestErrorMessage;
var validationErrorMessage = requestErrorMessage; //'Formatting error';
var routePrinter = function (req) {
    var routeText = "".concat(req.method, " ").concat(req.baseUrl.substring(4), "|");
    return routeText;
};
exports.routePrinter = routePrinter;
var messagePrinter = function (providedMessage, defaultMessage) {
    return "".concat(providedMessage ? providedMessage : defaultMessage, "|");
};
var dbErrorHandler = function (req, res, error, message) {
    var logMessage = (0, exports.routePrinter)(req) + messagePrinter(message, dbErrorMessage);
    logMessage += ". Db error code: ".concat(error.errno);
    logMessage += ". Db error message: ".concat(error.message);
    logger_js_1.default.error(logMessage);
    res.status(500).send(dbErrorMessage);
};
exports.dbErrorHandler = dbErrorHandler;
var successHandler = function (req, res, data, message) {
    var logMessage = (0, exports.routePrinter)(req) + messagePrinter(message, successMessage);
    logger_js_1.default.http(logMessage);
    if (typeof data === 'number') {
        data = { returnedNumberValue: data }; // If data is just a number, wrapping an object around it
        console.log(data);
    }
    res.status(200).send(data);
};
exports.successHandler = successHandler;
var requestErrorHandler = function (req, res, message) {
    var logMessage = (0, exports.routePrinter)(req) + messagePrinter(message, requestErrorMessage);
    logger_js_1.default.error(logMessage);
    res.status(400).send(requestErrorMessage);
};
exports.requestErrorHandler = requestErrorHandler;
var authenticationErrorHandler = function (req, res, message) {
    var logMessage = (0, exports.routePrinter)(req) + messagePrinter(message, authenticationErrorMessage);
    logger_js_1.default.error(logMessage);
    res.status(401).send(authenticationErrorMessage);
};
exports.authenticationErrorHandler = authenticationErrorHandler;
var authorizationErrorHandler = function (req, res, message) {
    var logMessage = (0, exports.routePrinter)(req) + messagePrinter(message, authorizationErrorMessage);
    logger_js_1.default.error(logMessage);
    res.status(403).send(authorizationErrorMessage);
};
exports.authorizationErrorHandler = authorizationErrorHandler;
var validationErrorHandler = function (req, res, message, validationResults) {
    var validationResultMessage = '';
    if (validationResults !== undefined) {
        validationResultMessage += (0, index_js_1.validationErrorFormatter)(validationResults);
    }
    validationResultMessage += "|".concat(message);
    var logMessage = (0, exports.routePrinter)(req) +
        messagePrinter(validationResultMessage, validationErrorMessage);
    logger_js_1.default.error(logMessage);
    res.status(400).send(validationErrorMessage);
};
exports.validationErrorHandler = validationErrorHandler;
