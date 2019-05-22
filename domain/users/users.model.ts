import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { environments } from '../../core/environments';

export interface User extends mongoose.Document {
    firstName: string,
    lastName: string,
    email: string,
    password: string
}

const usersSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },

})

const hashPassword = (obj, next) => {
    bcrypt.hash(obj.password, environments.ENCRYPT_ROUNDS)
        .then(hash => {
            obj.password = hash
            next()
        }).catch(next)
}

const saveMiddleware = function (next) {
    const user: User = this
    if (!user.isModified('password')) {
        next()
    } else {
        hashPassword(user, next)
    }
}

const updateMiddleware = function (next) {
    if (!this.getUpdate().password) {
        next()
    } else {
        hashPassword(this.getUpdate(), next)
    }
}


usersSchema.pre('save', saveMiddleware)
usersSchema.pre('findOneAndUpdate', updateMiddleware)
usersSchema.pre('update', updateMiddleware)


export const User = mongoose.model<User>('User', usersSchema)
