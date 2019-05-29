"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const tasks_model_1 = require("../tasks/tasks.model");
const dreamSchema = new mongoose.Schema({
    idUser: { type: String, required: true, select: false },
    title: { type: String, required: true },
    code: { type: Number },
    tasks: { type: [tasks_model_1.taskSchema], required: false, select: false }
});
exports.Dream = mongoose.model('Dream', dreamSchema);
