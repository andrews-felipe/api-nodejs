import * as restify from 'restify'
import { User } from "./users.model";
import { ModelRouter } from "../../core/model-router";
import { authenticate } from "../../security/auth.handler";

class UserRouter extends ModelRouter<User> {

    constructor() {
        super(User)
    }

    applyRoutes(app: restify.Server) {

        app.get('/users', this.findAll)
        app.get('/users/:id', this.findById)
        app.post('/users', this.save)
        app.put('/users/:id', [this.validateId, this.update])
        app.del('/users/:id', [this.validateId, this.delete])
    
        app.post('/auth', authenticate)
    }
}
export const usersRouter = new UserRouter()