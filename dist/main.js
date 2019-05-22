"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server/server");
const dream_router_1 = require("./domain/dreams/dream.router");
const users_router_1 = require("./domain/users/users.router");
const server = new server_1.Server();
const routerList = [
    dream_router_1.dreamsRouter, users_router_1.usersRouter
];
server.bootstrap(routerList).then(server => {
    console.log('Server On!', server.application.address());
}).catch((err) => {
    console.log(err);
    process.exit(1);
});
