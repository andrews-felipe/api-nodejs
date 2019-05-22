"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
exports.taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    finishAt: { type: Date, required: true },
    status: { type: String, required: true }
});
