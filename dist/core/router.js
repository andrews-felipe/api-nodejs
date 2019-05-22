"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Router {
    envolopeAll(documents, options = {}) {
        const resource = Object.assign({ itens: documents }, options);
        return resource;
    }
    render(response, next, options = {}) {
        return (document => {
            if (document) {
                response.json(this.envolopeAll(document, options));
            }
            else {
                response.json(this.envolopeAll([], options));
            }
            return next();
        });
    }
}
exports.Router = Router;
