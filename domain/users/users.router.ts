import { Router } from "../../core/router";
import * as restify from 'restify'
import { NotFoundError } from "restify-errors";
import { User } from "./users.model";
import { ModelRouter } from "../../core/model-router";

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
    }
}
export const usersRouter = new UserRouter()