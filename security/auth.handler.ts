import * as restify from 'restify'
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken'
import { User } from '../domain/users/users.model';
import { NotAuthorizedError } from 'restify-errors';
import { environments } from '../core/environments';



export const authenticate : restify.RequestHandler = (req, resp, next)=>{
    const {email, password} = req.body
    User.findOne({email : email}, "+password").then(user=>{
        console.log(user)
        
        if(user && comparePassword(password, user.password)){
            
            const token = jwt.sign({sub : user.email, iss : 'dream-api'}, environments.SECRET_KEY_TOKEN)
            resp.json({
                    name : user.firstName,
                    email : user.email, 
                    accessToken : token
                })
            return next(false)
        }else{
            return next(new NotAuthorizedError('Credenciais Inválidas'))
        }
    }).catch(next)
}


const comparePassword  = (passwordUser: string, passwordBase : string)=>{
    return bcrypt.compareSync(passwordUser, passwordBase)
}