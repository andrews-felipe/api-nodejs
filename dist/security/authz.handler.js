"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const restify_errors_1 = require("restify-errors");
exports.authorize = (req, resp, next) => {
    if (req.authenticated !== undefined) {
        next();
    }
    else {
        next(new restify_errors_1.ForbiddenError('Permission Negada'));
    }
};
