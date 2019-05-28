"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const users_model_1 = require("../domain/users/users.model");
const restify_errors_1 = require("restify-errors");
const environments_1 = require("../core/environments");
/**
 * Método de Autenticação
 * @param req
 * @param resp
 * @param next
 */
exports.authenticate = (req, resp, next) => {
    const { email, password } = req.body;
    findByEmail(email).then(user => {
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
/**
 * Buscar Usuário pelo email
 * @param email
 */
const findByEmail = (email) => {
    return users_model_1.User.findOne({ email: email }, { "password": 1, "firstName": 1, "email": 1 });
};
/**
 * Método para comparar os passwords
 * @param passwordUser
 * @param passwordBase
 */
const comparePassword = (passwordUser, passwordBase) => {
    return bcrypt.compareSync(passwordUser, passwordBase);
};
