"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("./router");
const mongoose = require("mongoose");
const restify_errors_1 = require("restify-errors");
const environments_1 = require("./environments");
/**
 * @author Andrews
 * Modelo<Service> de rotas genérico.
 */
class ModelRouter extends router_1.Router {
    constructor(model) {
        super();
        this.model = model;
        this.pageSize = 5;
        /**
         * Trata as requisições quando o id for inválido
         */
        this.validateId = (req, resp, next) => {
            if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
                next(new restify_errors_1.NotFoundError('ID não referenciado'));
            }
            else {
                next();
            }
        };
        /**
         * Gerador de código do sonho
         */
        this.generateCode = (req, resp, next) => {
            req.body.code = Math.floor(Math.random() * (environments_1.environments.MAX_GEN_CODE - environments_1.environments.MIN_GEN_CODE + 1) + environments_1.environments.MIN_GEN_CODE);
            next();
        };
        /**
         * Retorna apenas as tesks do sonho referenciado
         */
        this.findTasksByDreamCode = (req, resp, next) => {
            this.model.findOne({ code: req.params.code }, "+tasks")
                .then((result) => {
                result = result.tasks;
                resp.json(result);
                return next();
            }).catch(next);
        };
        /**
         * Altera a lista de tasks
         */
        this.changeTaskList = (req, resp, next) => {
            this.model.findById(req.params.id).then((list) => {
                if (!list) {
                    throw new restify_errors_1.NotFoundError('Sonho não encontrado');
                }
                else {
                    list.tasks = req.body;
                    return list.save();
                }
            }).then(this.render(resp, next))
                .catch(next);
        };
        /**
         * Retorna todos os objetos da rota
         */
        this.findAll = (req, resp, next) => {
            // paginação
            let page = parseInt(req.query._page || 1);
            page = page > 0 ? page : 1;
            const skip = (page - 1) * this.pageSize;
            this.model.count({}).exec().then(count => {
                this.model.find()
                    .skip(skip)
                    .limit(this.pageSize)
                    .then(this.render(resp, next, { page, count, pageSize: this.pageSize }));
            }).catch(next);
        };
        /**
         * Retorna o objeto pelo código referenciado
         */
        this.findByCode = (req, resp, next) => {
            this.model.findOne({ code: req.params.code })
                .then(this.render(resp, next))
                .catch(next);
        };
        /**
         * Retorna o objeto pelo id referenciado
         */
        this.findById = (req, resp, next) => {
            this.model.findById(req.params.id)
                .then(this.render(resp, next))
                .catch(next);
        };
        /**
         * Salva o dado no banco, de acordo com a rota.
         */
        this.save = (req, resp, next) => {
            let document = new this.model(req.body);
            document.save()
                .then(this.render(resp, next))
                .catch(next);
        };
        /**
         * Atualiza o documento, de acordo com o id
         */
        this.update = (req, resp, next) => {
            const options = { overwrite: true };
            this.model.update({ _id: req.params.id }, req.body, options)
                .exec().then(result => {
                if (result.n) {
                    return this.model.findById(req.params.id).exec();
                }
                else {
                    throw new restify_errors_1.NotFoundError('Item não encontrado');
                }
            }).then(this.render(resp, next))
                .catch(next);
        };
        /**
         * Deleta o objeto refecnaido pelo id.
         */
        this.delete = (req, resp, next) => {
            this.model.remove({ _id: req.params.id }).exec().then((response) => {
                if (response.result.n) {
                    resp.send(204);
                }
                else {
                    throw new restify_errors_1.NotFoundError('Item não encontrado');
                }
                return next();
            }).catch(next);
        };
    }
}
exports.ModelRouter = ModelRouter;
