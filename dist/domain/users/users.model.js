"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const environments_1 = require("../../core/environments");
const usersSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
});
const hashPassword = (obj, next) => {
    bcrypt.hash(obj.password, environments_1.environments.ENCRYPT_ROUNDS)
        .then(hash => {
        obj.password = hash;
        next();
    }).catch(next);
};
const saveMiddleware = function (next) {
    const user = this;
    if (!user.isModified('password')) {
        next();
    }
    else {
        hashPassword(user, next);
    }
};
const updateMiddleware = function (next) {
    if (!this.getUpdate().password) {
        next();
    }
    else {
        hashPassword(this.getUpdate(), next);
    }
};
usersSchema.pre('save', saveMiddleware);
usersSchema.pre('findOneAndUpdate', updateMiddleware);
usersSchema.pre('update', updateMiddleware);
exports.User = mongoose.model('User', usersSchema);
