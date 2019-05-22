import * as restify from 'restify'
import { User } from '../domain/users/users.model';
import { NotAuthorizedError } from 'restify-errors';
import * as bcrypt from 'bcrypt';

export const authenticate : restify.RequestHandler = (req, resp, next)=>{
    const {email, password} = req.body
    User.findOne({email : email}, "+password").then(user=>{
        if(user && comparePassword(password, '')){
            
        }else{
            return next(new NotAuthorizedError('Credenciais Inválidas'))
        }
    }).catch(next)
}


const comparePassword  = (passwordBase: string, passwordUser : string)=>{
    return bcrypt.compareSync(passwordBase, passwordUser)
}