"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dreams_model_1 = require("./dreams.model");
const model_router_1 = require("../../core/model-router");
const authz_handler_1 = require("../../security/authz.handler");
class DreamRouter extends model_router_1.ModelRouter {
    constructor() {
        super(dreams_model_1.Dream);
    }
    applyRoutes(app) {
        app.get('/dreams', [authz_handler_1.authorize, this.findAllofUser]);
        app.get('/dreams/:code', [authz_handler_1.authorize, this.findByCode]);
        app.post('/dreams', [authz_handler_1.authorize, this.generateCode, this.save]);
        app.put('/dreams/:id', [authz_handler_1.authorize, this.validateId, this.update]);
        app.del('/dreams/:id', [authz_handler_1.authorize, this.validateId, this.delete]);
        app.get('/dreams/:code/tasks', [authz_handler_1.authorize, this.findTasksByDreamCode]);
        app.put('/dreams/:id/tasks', [authz_handler_1.authorize, this.validateId, this.changeTaskList]);
    }
}
exports.dreamsRouter = new DreamRouter();
