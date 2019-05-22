"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dreams_model_1 = require("./dreams.model");
const model_router_1 = require("../../core/model-router");
class DreamRouter extends model_router_1.ModelRouter {
    constructor() {
        super(dreams_model_1.Dream);
    }
    applyRoutes(app) {
        app.get('/dreams', this.findAll);
        app.get('/dreams/:code', this.findByCode);
        app.post('/dreams', [this.generateCode, this.save]);
        app.put('/dreams/:id', [this.validateId, this.update]);
        app.del('/dreams/:id', [this.validateId, this.delete]);
        app.get('/dreams/:code/tasks', this.findTasksByDreamCode);
        app.put('/dreams/:id/tasks', [this.validateId, this.changeTaskList]);
    }
}
exports.dreamsRouter = new DreamRouter();
