"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const dreamSchema = new mongoose.Schema({
    title: { type: String, required: true },
    code: { type: Number },
});
exports.Dream = mongoose.model('Dream', dreamSchema);
