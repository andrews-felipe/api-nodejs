import * as restify from 'restify'
import * as mongoose from 'mongoose'
import { environments } from '../core/environments';
import { Router } from '../core/router';
import { handleError } from './error.handle';


export class Server {

    application: restify.Server;

    initializeDb(): mongoose.MongooseThenable {
        (<any>mongoose).Promise = global.Promise;
        return mongoose.connect(environments.DB_PATH, {
            useMongoClient: true
        })
    }

    initRouters(routers: Router[] = []): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                this.application = restify.createServer({
                    name: 'dream-api',
                    version: '1.0.0'
                })
                this.application.use(restify.plugins.queryParser());
                this.application.use(restify.plugins.bodyParser());

                for (let router of routers) {
                    router.applyRoutes(this.application)
                }

                this.application.listen(environments.SERVER_PORT, () => {
                    resolve(this.application);
                })

                this.application.on('restifyError', handleError)

            } catch (error) {
                reject(error);
            }
        })
    }
    bootstrap(routers: Router[] = []): Promise<any> {
        return this.initializeDb().then(() =>
            this.initRouters(routers).then(() => this))
    }
}