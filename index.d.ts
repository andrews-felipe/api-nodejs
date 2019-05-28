import { User } from "./domain/users/users.model";

declare module 'restify' {
    export interface Request{
        authenticated : User
    }
}