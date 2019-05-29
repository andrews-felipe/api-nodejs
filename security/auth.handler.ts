import * as restify from 'restify'
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken'
import { User } from '../domain/users/users.model';
import { NotAuthorizedError } from 'restify-errors';
import { environments } from '../core/environments';

/**
 * Método de Autenticação
 * @param req 
 * @param resp 
 * @param next 
 */
export const authenticate: restify.RequestHandler = (req, resp, next) => {
    const { email, password } = req.body

    findByEmail(email).then(user => {

        if (user && comparePassword(password, user.password)) {
                
            const token = jwt.sign({ sub: user.email, iss: 'dream-api' }, environments.SECRET_KEY_TOKEN)
            resp.json({
                name: user.firstName,
                email: user.email,
                accessToken: token
            })
            return next(false)
        } else {
            return next(new NotAuthorizedError('Credenciais Inválidas'))
        }
    }).catch(next)
}

/**
 * Buscar Usuário pelo email
 * @param email 
 */
const findByEmail = (email) => {
    return User.findOne({ email: email }, { "password": 1, "firstName": 1, "email": 1 })
}

/**
 * Método para comparar os passwords
 * @param passwordUser 
 * @param passwordBase 
 */
const comparePassword = (passwordUser: string, passwordBase: string) => {
    return bcrypt.compareSync(passwordUser, passwordBase)
}

