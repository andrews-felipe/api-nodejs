import * as restify from 'restify'
import * as jwt from 'jsonwebtoken'
import { environments } from '../core/environments';
import { User } from '../domain/users/users.model';


export const validateRequestWithToken: restify.RequestHandler = (req, resp, next) => {
    const token = extractToken(req)
    if (token) {
        jwt.verify(token, environments.SECRET_KEY_TOKEN, applyBearer(req, next))
    } else {
        next()
    }
}

function extractToken(req: restify.Request) {
    let token = undefined
    const authorization = req.header('authorization')
    // quebrando o token
    if (authorization) {
        const parts: string[] = authorization.split(' ')
        if (parts.length === 2 && parts[0] === 'Bearer') {
            token = parts[1]
        }
    }
    return token
}

/**
 * 
 * @param req 
 * @param next 
 */
function applyBearer(req: restify.Request, next): (error, decoded) => void {
    return (error, decoded) => {
        if (decoded) {
            findByEmail(decoded.sub).then(user => {
                if (user) {
                    req.authenticated = user
                }
                next()
            }).catch(next)
        } else {
            next()
        }
    }
}

/**
 * Buscar Usuário pelo email
 * @param email 
 */
const findByEmail = (email) => {
    return User.findOne({ email: email }, { "password": 1, "firstName": 1, "email": 1 })
}