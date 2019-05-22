"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users_model_1 = require("../domain/users/users.model");
const restify_errors_1 = require("restify-errors");
const bcrypt = require("bcrypt");
exports.authenticate = (req, resp, next) => {
    const { email, password } = req.body;
    users_model_1.User.findOne({ email: email }, "+password").then(user => {
        if (user && comparePassword(password, '')) {
        }
        else {
            return next(new restify_errors_1.NotAuthorizedError('Credenciais Inválidas'));
        }
    }).catch(next);
};
const comparePassword = (passwordBase, passwordUser) => {
    return bcrypt.compareSync(passwordBase, passwordUser);
};
