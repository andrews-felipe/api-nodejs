import * as restify from 'restify'
import { Dream } from "./dreams.model";
import { ModelRouter } from "../../core/model-router";

class DreamRouter extends ModelRouter<Dream> {
    
    constructor(){
       super(Dream) 
    }
    applyRoutes(app: restify.Server) {
        app.get('/dreams', this.findAll)
        app.get('/dreams/:code', this.findByCode)
        app.post('/dreams', [this.generateCode ,this.save])
        app.put('/dreams/:id', [this.validateId, this.update])
        app.del('/dreams/:id', [this.validateId, this.delete])

        app.get('/dreams/:code/tasks', this.findTasksByDreamCode)
        app.put('/dreams/:id/tasks', [this.validateId, this.changeTaskList])
    }
}

export const dreamsRouter = new DreamRouter()