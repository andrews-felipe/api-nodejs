"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users_model_1 = require("./users.model");
const model_router_1 = require("../../core/model-router");
class UserRouter extends model_router_1.ModelRouter {
    constructor() {
        super(users_model_1.User);
    }
    applyRoutes(app) {
        app.get('/users', this.findAll);
        app.get('/users/:id', this.findById);
        app.post('/users', this.save);
        app.put('/users/:id', [this.validateId, this.update]);
        app.del('/users/:id', [this.validateId, this.delete]);
    }
}
exports.usersRouter = new UserRouter();
