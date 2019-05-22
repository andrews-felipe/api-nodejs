"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const restify = require("restify");
const mongoose = require("mongoose");
const environments_1 = require("../core/environments");
const error_handle_1 = require("./error.handle");
class Server {
    initializeDb() {
        mongoose.Promise = global.Promise;
        return mongoose.connect(environments_1.environments.DB_PATH, {
            useMongoClient: true
        });
    }
    initRouters(routers = []) {
        return new Promise((resolve, reject) => {
            try {
                this.application = restify.createServer({
                    name: 'dream-api',
                    version: '1.0.0'
                });
                this.application.use(restify.plugins.queryParser());
                this.application.use(restify.plugins.bodyParser());
                for (let router of routers) {
                    router.applyRoutes(this.application);
                }
                this.application.listen(environments_1.environments.SERVER_PORT, () => {
                    resolve(this.application);
                });
                this.application.on('restifyError', error_handle_1.handleError);
            }
            catch (error) {
                reject(error);
            }
        });
    }
    bootstrap(routers = []) {
        return this.initializeDb().then(() => this.initRouters(routers).then(() => this));
    }
}
exports.Server = Server;
