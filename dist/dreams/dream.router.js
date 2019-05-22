"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dreams_model_1 = require("./dreams.model");
const model_router_1 = require("../common/model-router");
class DreamRouter extends model_router_1.ModelRouter {
    constructor() {
        super(dreams_model_1.Dream);
    }
    applyRoutes(app) {
        app.get('/dreams', this.findAll);
        app.get('/dreams/:id', [this.validateId, this.findById]);
        app.post('/dreams', [this.generateCode, this.save]);
        app.put('/dreams/:id', [this.validateId, this.update]);
        app.del('/dreams/:id', [this.validateId, this.delete]);
    }
}
exports.dreamsRouter = new DreamRouter();
