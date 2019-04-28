const restify = require('restify');
const mongoose = require('mongoose');
const corsMiddleware = require('restify-cors-middleware');

mongoose.connect('mongodb+srv://apiuser:apiuser@andrews-database-y665r.mongodb.net/test?retryWrites=true')
    .then(_ => {


        var server = restify.createServer({
            name: 'rest-api',
            version: '1.0.0',
            ignoreTrailingSlash: true
        })

        var cors = corsMiddleware({
            preflightMaxAge: 10,
            origins: ['*'],
            allowHeaders: ['X-App-Version'],
            exposeHeaders: []
        });

        server.pre(cors.preflight);
        server.use(cors.actual);

       
        server.listen(3000, () => {
            console.log('Servidor Online Porta 3000')
        })

        // SCHEMA
        const taskSchema = mongoose.Schema({
            title: { type: String, require: true },
            body: { type: String, require: true },
            date: { type: String, require: true },
            done: { type: Boolean, require: true },
        })

        // INSTÂNCIA MODELO
        const Task = mongoose.model('task', taskSchema)

        server.use(restify.plugins.bodyParser())

        // MÉTODOS
        server.get('/task', (req, res, next) => {
            Task.find().then(tasks => {
                res.json(tasks)
                return next()
            })
        })

        server.get('/task/:id', (req, res, next) => {
            Task.findById(req, params.id).then(task => {
                if (task) {
                    res.json(task)
                } else {
                    res.status(404)
                    res.json('Item não existente')
                }
                return next()
            })
        })

        server.post('/task', (req, res, next) => {
            let newTask = new Task(req.body)
            newTask.save().then(newTask => {
                res.json(newTask)
            }).catch(error => {
                res.status(400)
                res.json({ message: error.message })
            })
            return next()
        })

        server.put('/task/:id', (req, res, next) => {
            Task.findByIdAndUpdate(req.params.id, { $set: req.body }).then(
                _ => { res.send(req.body) }
            ).catch(error => {
                res.status(400)
                res.json({ message: error.message })
            })
            return next()
        })

        server.del('/task/:id', (req, res, next) => {
            Task.findByIdAndDelete(req.params.id).then(
                task => { res.send(task) }
            ).catch(error => {
                res.status(400)
                res.json({ message: error.message })
            })
            return next()
        })

    })
