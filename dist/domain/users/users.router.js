"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users_model_1 = require("./users.model");
const model_router_1 = require("../../core/model-router");
const auth_handler_1 = require("../../security/auth.handler");
const authz_handler_1 = require("../../security/authz.handler");
class UserRouter extends model_router_1.ModelRouter {
    constructor() {
        super(users_model_1.User);
    }
    applyRoutes(app) {
        app.get('/users', [authz_handler_1.authorize, this.findAll]);
        app.get('/users/:id', [authz_handler_1.authorize, this.findById]);
        app.post('/users', this.save);
        app.put('/users/:id', [authz_handler_1.authorize, this.validateId, this.update]);
        app.del('/users/:id', [authz_handler_1.authorize, this.validateId, this.delete]);
        app.post('/auth', auth_handler_1.authenticate);
    }
}
exports.usersRouter = new UserRouter();
