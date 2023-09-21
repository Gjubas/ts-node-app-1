"use strict";
/*
---- WINSTON LOGGER ----
Winston logger is a generic JavaScript logger. We can use it to log events and errors that
happen on the backend.
It's possible to edit the logging formats and the logging levels.
NPM: https://www.npmjs.com/package//winston
*/
Object.defineProperty(exports, "__esModule", { value: true });
var winston_1 = require("winston");
//const LEVEL = 'level';
// Modifying the log for easier reading
var customFormat = winston_1.format.combine(winston_1.format.timestamp({ format: 'YYYYMMDD|HH:mm:ss' }), winston_1.format.splat(), winston_1.format.printf(function (info) {
    return "".concat(info.timestamp, "|").concat(info.level.toLocaleUpperCase(), "|").concat(info.message);
}));
// Which log levels we want to show / see
function filterOnly(level) {
    var LEVEL = 'level';
    return (0, winston_1.format)(function (info, http) {
        if (info[LEVEL] === level) {
            return info;
        }
        if (http[LEVEL] === level) {
            return http;
        }
    })();
}
var logger = (0, winston_1.createLogger)({
    format: customFormat,
    transports: [
        new winston_1.transports.Console({ level: 'silly' }),
        // Where are which logs saved
        new winston_1.transports.File({
            filename: './logs/app.log',
            level: 'verbose',
        }),
        new winston_1.transports.File({ filename: './logs/error.log', level: 'error' }),
        new winston_1.transports.File({
            filename: './logs/http.log',
            level: 'http',
            format: filterOnly('http'),
        }),
    ],
});
exports.default = logger;
