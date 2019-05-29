import { Router } from './router'
import * as mongoose from 'mongoose'
import { NotFoundError } from 'restify-errors';
import { environments } from './environments';

/**
 * @author Andrews
 * Modelo<Service> de rotas genérico.
 */

export abstract class ModelRouter<D extends mongoose.Document> extends Router {

    pageSize: number = 5

    constructor(protected model: mongoose.Model<D>) {
        super()
    }
    /**
     * Trata as requisições quando o id for inválido
     */
    validateId = (req, resp, next) => {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            next(new NotFoundError('ID não referenciado'))
        } else {
            next()
        }
    }
    /**
     * Gerador de código do sonho
     */
    generateCode = (req, resp, next) => {
        req.body.code = Math.floor(Math.random() * (environments.MAX_GEN_CODE - environments.MIN_GEN_CODE + 1) + environments.MIN_GEN_CODE);
        next()
    }
    /**
     * Retorna apenas as tesks do sonho referenciado
     */
    findTasksByDreamCode = (req, resp, next) => {
        this.model.findOne({ code: req.params.code }, "+tasks")
            .then((result: any) => {
                result = result.tasks
                resp.json(result)
                return next()
            }).catch(next)
    }
    /**
     * Altera a lista de tasks
     */
    changeTaskList = (req, resp, next) => {
        this.model.findById(req.params.id).then((list: any) => {
            if (!list) {
                throw new NotFoundError('Sonho não encontrado')
            } else {
                list.tasks = req.body
                return list.save()
            }
        }).then(this.render(resp, next))
            .catch(next)
    }
    /**
     * Retorna todos os objetos da rota
     */
    findAll = (req, resp, next) => {
        // paginação
        let page = parseInt(req.query._page || 1)
        page = page > 0 ? page : 1
        const skip = (page - 1) * this.pageSize

        this.model.count({}).exec().then(count => {
            this.model.find()
                .skip(skip)
                .limit(this.pageSize)
                .then(this.render(resp, next, { page, count, pageSize: this.pageSize }))
        }).catch(next)
    }

    /**
     * Retorna todos os objetos da rota
     */
    findAllofUser = (req, resp, next) => {
        // paginação
        let page = parseInt(req.query._page || 1)
        page = page > 0 ? page : 1
        const skip = (page - 1) * this.pageSize

        this.model.count({}).exec().then(count => {
            this.model.find({idUser : req.authenticated._id})
                .skip(skip)
                .limit(this.pageSize)
                .then(this.render(resp, next, { page, count, pageSize: this.pageSize }))
        }).catch(next)
    }


    /**
     * Retorna o objeto pelo código referenciado
     */
    findByCode = (req, resp, next) => {
        this.model.findOne({ code: req.params.code })
            .then(this.render(resp, next))
            .catch(next)
    }
    /**
     * Retorna o objeto pelo id referenciado
     */
    findById = (req, resp, next) => {
        this.model.findById(req.params.id)
            .then(this.render(resp, next))
            .catch(next)
    }
    /**
     * Salva o dado no banco, de acordo com a rota.
     */
    save = (req, resp, next) => {
        // adicionando o id do usuário
        if(req.authenticated){
            req.body.idUser = req.authenticated._id
        }
        let document = new this.model(req.body)
        document.save()
            .then(this.render(resp, next))
            .catch(next)
    }
    /**
     * Atualiza o documento, de acordo com o id
     */
    update = (req, resp, next) => {
        const options = { overwrite: true }
        this.model.update({ _id: req.params.id }, req.body, options)
            .exec().then(result => {
                if (result.n) {
                    return this.model.findById(req.params.id).exec()
                } else {
                    throw new NotFoundError('Item não encontrado')
                }
            }).then(this.render(resp, next))
            .catch(next)
    }
    /**
     * Deleta o objeto refecnaido pelo id.
     */
    delete = (req, resp, next) => {
        this.model.remove({ _id: req.params.id }).exec().then(
            (response: any) => {
                if (response.result.n) {
                    resp.send(204)
                } else {
                    throw new NotFoundError('Item não encontrado')
                }
                return next()
            }
        ).catch(next)
    }
}