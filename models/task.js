const mongoose = require("mongoose"),
    Schema = mongoose.Schema;

// create a schema for Leader
const taskSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    description: String,
    startDate: {type: Date, default: Date.now() },
    finishDate: {type: Date, default: Date.now() }
});

// Create a model using schema
const Task = mongoose.model('Task', taskSchema);

// make this model available
module.exports = Task;