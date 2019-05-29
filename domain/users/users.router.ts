import * as restify from 'restify'
import { User } from "./users.model";
import { ModelRouter } from "../../core/model-router";
import { authenticate } from "../../security/auth.handler";
import { authorize } from '../../security/authz.handler';

class UserRouter extends ModelRouter<User> {

    constructor() {
        super(User)
    }

    applyRoutes(app: restify.Server) {

        app.get('/users', [authorize, this.findAll])
        app.get('/users/:id', [authorize, this.findById])
        app.post('/users', this.save)
        app.put('/users/:id', [authorize, this.validateId, this.update])
        app.del('/users/:id', [authorize, this.validateId, this.delete])
    
        app.post('/auth', authenticate)
    }
}
export const usersRouter = new UserRouter()