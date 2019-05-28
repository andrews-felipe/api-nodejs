"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const environments_1 = require("../core/environments");
const users_model_1 = require("../domain/users/users.model");
exports.validateRequestWithToken = (req, resp, next) => {
    const token = extractToken(req);
    if (token) {
        jwt.verify(token, environments_1.environments.SECRET_KEY_TOKEN, applyBearer(req, next));
    }
    else {
        next();
    }
};
function extractToken(req) {
    const authorization = req.header('authorization');
    // Quebrando o token
    if (authorization) {
        const parts = authorization.split(' ');
        if (parts.length === 2 && parts[0] === 'Bearer') {
            return parts[1];
        }
        return undefined;
    }
}
/**
 *
 * @param req
 * @param next
 */
function applyBearer(req, next) {
    return (error, decoded) => {
        if (decoded) {
            findByEmail(decoded.sub).then(user => {
                if (user) {
                    req.authenticated = user;
                }
                next();
            }).catch(next);
        }
        else {
            next();
        }
    };
}
/**
 * Buscar Usuário pelo email
 * @param email
 */
const findByEmail = (email) => {
    return users_model_1.User.findOne({ email: email }, { "password": 1, "firstName": 1, "email": 1 });
};
