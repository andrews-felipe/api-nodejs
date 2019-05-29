import * as restify from 'restify'
import { Dream } from "./dreams.model";
import { ModelRouter } from "../../core/model-router";
import { authorize } from '../../security/authz.handler';


class DreamRouter extends ModelRouter<Dream> {

    constructor() {
        super(Dream)
    }

    applyRoutes(app: restify.Server) {
        app.get('/dreams', [authorize, this.findAllofUser])
        app.get('/dreams/:code', [authorize, this.findByCode])
        app.post('/dreams', [authorize, this.generateCode, this.save])
        app.put('/dreams/:id', [authorize, this.validateId, this.update])
        app.del('/dreams/:id', [authorize, this.validateId, this.delete])

        app.get('/dreams/:code/tasks', [authorize, this.findTasksByDreamCode])
        app.put('/dreams/:id/tasks', [authorize, this.validateId, this.changeTaskList])
    }
}

export const dreamsRouter = new DreamRouter()