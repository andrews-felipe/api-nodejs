import * as mongoose from 'mongoose';

export interface Tasks extends mongoose.Document{
    title : string,
    finishAt : Date
    status : string
}

export const taskSchema = new mongoose.Schema({
    title : { type : String, required : true },
    finishAt : { type : Date, required : true},
    status : { type : String, required : true }
})