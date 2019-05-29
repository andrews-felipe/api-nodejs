import * as mongoose from 'mongoose';
import { Tasks, taskSchema } from '../tasks/tasks.model';

export interface Dream extends mongoose.Document{
    title : string,
    code : number
    tasks : Tasks[]
}

const dreamSchema = new mongoose.Schema({
    idUser : {type : String, required : true, select : false},
    title : { type : String, required : true },
    code : { type : Number },
    tasks : { type : [taskSchema] , required : false, select : false}

})
export const Dream = mongoose.model<Dream>('Dream', dreamSchema)
