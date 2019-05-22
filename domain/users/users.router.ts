import { Router } from "../../core/router";
import * as restify from 'restify'
import { NotFoundError } from "restify-errors";
import { User } from "./users.model";

class UserRouter extends Router {

    applyRoutes(app: restify.Server) {

        app.get('/users', (req, resp, next) => {
            User.find()
                .then(this.render(resp, next))
                .catch(next)
        })

        app.get('/users/:id', (req, resp, next) => {
            User.findById(req.params.id)
                .then(this.render(resp, next))
                .catch(next)
        })

        app.post('/users', (req, resp, next) => {
            let dream = new User(req.body)
            dream.save()
                .then(this.render(resp, next))
                .catch(next)
        })

        app.put('/users/:id', (req, resp, next) => {
            const options = { runValidators : true, overwrite: true }
            User.update({ _id: req.params.id }, req.body, options)
                .exec().then(result => {
                    if (result.n) {
                        return User.findById(req.params.id).exec()
                    } else {
                        throw new NotFoundError('Item não encontrado')
                    }
                }).then(this.render(resp, next))
                .catch(next)
        })

        app.del('/users/:id', (req, resp, next) => {
            User.remove({ _id: req.params.id }).exec().then(
                (response: any) => {
                    if (response.result.n) {
                        resp.send(204)
                    } else {
                        throw new NotFoundError('Item não encontrado')
                    }
                    return next()
                }
            ).catch(next)
        })

    }
}

export const usersRouter = new UserRouter()