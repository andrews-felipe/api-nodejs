import { Server } from "./server/server";
import { dreamsRouter } from './domain/dreams/dream.router'
import { usersRouter } from "./domain/users/users.router";

const server = new Server()

const routerList = [
    dreamsRouter, usersRouter
]

server.bootstrap(routerList).then(server => {
    console.log('Server On!', server.application.address())
    
}).catch((err) => {
    console.log(err)
    process.exit(1)
})


