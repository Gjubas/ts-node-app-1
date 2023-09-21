"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAddUpdateDepartment = exports.validateAddSetting = exports.validateBuildingMultiPost = exports.validateBuildingPost = exports.validateAddEquipment = exports.validatePriorityMustBeNumber = exports.validateDescriptionObl = exports.validateDescription = exports.validateNameObl = exports.validateIdObl = exports.validate = exports.validationErrorFormatter = void 0;
/*
  ---- EXPRESS VALIDATOR ----
  Express-validator is a library that can be used to validate the data coming from
  the frontend or other client
  https://express-validator.github.io/docs/
*/
var express_validator_1 = require("express-validator");
var index_js_1 = require("../responseHandler/index.js");
// Formatter for printing the first validation error (index 0) out as string
var validationErrorFormatter = function (result) {
    // return `${result.array()[0].location}[${result.array()[0].param}]: ${
    //   result.array()[0].msg }`;
    return "".concat(result.array()[0].msg);
};
exports.validationErrorFormatter = validationErrorFormatter;
// Express middleware function
var validate = function (req, res, next) {
    var validationResults = (0, express_validator_1.validationResult)(req);
    if (!validationResults.isEmpty()) {
        (0, index_js_1.validationErrorHandler)(req, res, 'Validation', validationResults);
        return;
    }
    else {
        next();
    }
};
exports.validate = validate;
exports.validateIdObl = [
    (0, express_validator_1.check)('id')
        .isLength({ min: 4, max: 4 }) // Nice way to make e.g.  valid id 4015 fail for testing
        .withMessage('Id Must be between 4-4 characters long')
        .bail()
        .matches(/^[0-9]+$/)
        .withMessage('Id must be a number')
        .bail()
        .notEmpty()
        .withMessage('Cannot be empty')
        .bail(),
];
exports.validateNameObl = [
    (0, express_validator_1.check)('name')
        .isLength({ min: 2, max: 5 })
        .withMessage('Must be between 2-5 characters long')
        .bail()
        .matches(/^[A-Za-zäöåÄÖÅ0-9\s-]*$/)
        .withMessage('Must contain only letters, numbers and -')
        .bail()
        .notEmpty()
        .withMessage('Cannot be empty')
        .bail(),
];
exports.validateDescription = [
    (0, express_validator_1.check)('description')
        .isLength({ min: 2, max: 255 })
        .withMessage('Must be between 2-255 characters long')
        .bail()
        .matches(/^[A-Za-zäöåÄÖÅ0-9\s-]*$/)
        .withMessage('Must contain only letters, numbers and -')
        .bail(),
    /* LATER:
    check('description').isLength({ max: 16000 })
      .withMessage('Must be at maximum 16000 characters long')
      .matches(/^[A-Za-zäöåÄÖÅ0-9\s-]*$/)
      .withMessage('Must contain only letters, numbers and -')
      .bail(),
  */
];
exports.validateDescriptionObl = __spreadArray(__spreadArray([], exports.validateDescription, true), [
    (0, express_validator_1.check)('description').notEmpty().withMessage('Cannot be empty').bail(),
], false);
exports.validatePriorityMustBeNumber = [
    (0, express_validator_1.check)('priority').matches(/^[0-9]+$/).withMessage('Must be a number').bail(),
];
exports.validateAddEquipment = __spreadArray(__spreadArray(__spreadArray(__spreadArray([], exports.validateNameObl, true), exports.validateDescriptionObl, true), exports.validatePriorityMustBeNumber, true), [
    (0, express_validator_1.check)('isMovable')
        .matches(/^[01]$/)
        .withMessage('isMovable needs to be 1 = can be moved, 0 = cannot be moved.')
        .bail(),
], false);
/* ---- BUILDING ---- */
exports.validateBuildingPost = __spreadArray(__spreadArray([], exports.validateNameObl, true), exports.validateDescriptionObl, true);
// This a bit different as body can have multiple objects,
// => MultiPost!!!
exports.validateBuildingMultiPost = [
    (0, express_validator_1.body)('*.name')
        .isLength({ min: 2, max: 255 })
        .withMessage('Must be between 2-255 characters long')
        .bail()
        .matches(/^[A-Za-zäöåÄÖÅ0-9\s-]*$/)
        .withMessage('Must contain only letters, numbers and -')
        .bail()
        .notEmpty()
        .withMessage('Cannot be empty')
        .bail(),
    (0, express_validator_1.body)('*.description')
        .isLength({ min: 2, max: 255 })
        .withMessage('Must be between 2-255 characters long')
        .matches(/^[A-Za-zäöåÄÖÅ0-9\s-]*$/)
        .withMessage('Must contain only letters, numbers and -')
        .bail(),
];
exports.validateAddSetting = __spreadArray(__spreadArray([], exports.validateNameObl, true), exports.validateDescriptionObl, true);
exports.validateAddUpdateDepartment = __spreadArray(__spreadArray([], exports.validateNameObl, true), exports.validateDescriptionObl, true);
