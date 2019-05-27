"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const users_model_1 = require("../domain/users/users.model");
const restify_errors_1 = require("restify-errors");
const environments_1 = require("../core/environments");
exports.authenticate = (req, resp, next) => {
    const { email, password } = req.body;
    users_model_1.User.findOne({ email: email }, "+password").then(user => {
        console.log(user);
        if (user && comparePassword(password, user.password)) {
            const token = jwt.sign({ sub: user.email, iss: 'dream-api' }, environments_1.environments.SECRET_KEY_TOKEN);
            resp.json({
                name: user.firstName,
                email: user.email,
                accessToken: token
            });
            return next(false);
        }
        else {
            return next(new restify_errors_1.NotAuthorizedError('Credenciais Inválidas'));
        }
    }).catch(next);
};
const comparePassword = (passwordUser, passwordBase) => {
    return bcrypt.compareSync(passwordUser, passwordBase);
};
