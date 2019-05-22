"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("../../core/router");
const restify_errors_1 = require("restify-errors");
const users_model_1 = require("./users.model");
class UserRouter extends router_1.Router {
    applyRoutes(app) {
        app.get('/users', (req, resp, next) => {
            users_model_1.User.find()
                .then(this.render(resp, next))
                .catch(next);
        });
        app.get('/users/:id', (req, resp, next) => {
            users_model_1.User.findById(req.params.id)
                .then(this.render(resp, next))
                .catch(next);
        });
        app.post('/users', (req, resp, next) => {
            let dream = new users_model_1.User(req.body);
            dream.save()
                .then(this.render(resp, next))
                .catch(next);
        });
        app.put('/users/:id', (req, resp, next) => {
            const options = { runValidators: true, overwrite: true };
            users_model_1.User.update({ _id: req.params.id }, req.body, options)
                .exec().then(result => {
                if (result.n) {
                    return users_model_1.User.findById(req.params.id).exec();
                }
                else {
                    throw new restify_errors_1.NotFoundError('Item não encontrado');
                }
            }).then(this.render(resp, next))
                .catch(next);
        });
        app.del('/users/:id', (req, resp, next) => {
            users_model_1.User.remove({ _id: req.params.id }).exec().then((response) => {
                if (response.result.n) {
                    resp.send(204);
                }
                else {
                    throw new restify_errors_1.NotFoundError('Item não encontrado');
                }
                return next();
            }).catch(next);
        });
    }
}
exports.usersRouter = new UserRouter();
