import * as restify from 'restify'
import { NotFoundError } from 'restify-errors';

export abstract class Router {
    abstract applyRoutes(application: restify.Server)

    envolopeAll(documents : any[], options = {}): any{
        const resource : any = {itens: documents, ...options}
        return resource
    }

    render(response: restify.Response, next: restify.Next, options = {}) {
        return (document => {
            if (document) {
                response.json(this.envolopeAll(document, options))
            } else {
                response.json(this.envolopeAll([], options))
            }
            return next()
        })
    }
}

