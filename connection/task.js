const mongoose = require("mongoose"),
    config = require("../config/config.js"),
    Task = require("../models/task");


// Function to establish connection for the Database
exports.connectToDb = function (callback) {
    // If the connection is already established, Then don't create one more connection
    if (mongoose.connection.readyState) {
        callback(undefined, {msg: "connected", code: 200});
        return;
    }
    // Establish the DB connection
    mongoose.connect(config.dbPath);
    // Event for successfully connecting database
    mongoose.connection.on("connected", function () {
        callback(undefined, {msg: "connected", code: 200});
    });
    // Event when there is an error connecting for database
    mongoose.connection.on("error", function (err) {
        console.log("[connectToDb] Error connecting to DB " + err);
        callback(err);
    });
};

// Function to get the information of a matched document
exports.list = async (callback) => {
    // Fetch the dish information
    await Task.find(function (err, success) {
        if (err) {
            console.log("Error fetching the docs " + err);
            callback(err);
            return;
        }
        callback(undefined, success);
    }).sort({startDate:-1});
};

// Function to get the information of a matched document
exports.getById = async (taskId, callback) => {
    // Fetch the dish information
    await Task.findById(taskId, function (err, success) {
        if (err) {
            console.log("Error fetching the doc " + err);
            callback(err);
            return;
        }
        callback(undefined, success);
    });
};

// Function to create the task
exports.create = async (task, callback) => {

    // To create the model for new Task
    let _task = new Task({
        _id: new mongoose.Types.ObjectId(),
        description: task.description,
        startDate: new Date(),
        finishDate: new Date(task.finishDate)
    });
    // Saving the Task model
    await _task.save(function (err, success) {
        if (err) {
            console.log("[create] Error creating the doc " + err);
            callback(err);
            return;
        }
        callback(undefined, success);
    });
};

// Function to update the task
exports.update = async (taskId, task, callback) => {
    await Task.find({_id: taskId}, function (err, success) {
        if (err) {
            console.log("[get] Error fetching the doc " + err);
            callback(err);
            return;
        }

        // If the task is available, Then update the existing document
        if (success.length > 0) {
            let _task = success[0];
            _task.description = task.description;
            _task.finishDate = task.finishDate;
            _task.save(function (err, success) {
                if (err) {
                    console.log("[update] Error updating the doc " + err);
                    callback(err);
                    return;
                }
                callback(undefined, success);
            });
        }
        else {
            err = "The doc with this id does not exist!";
            callback(err);
        }
    });

};

exports.remove = async (taskId, callback) => {
    await Task.findOneAndRemove({_id: taskId}, function (err, success) {
        if (err) {
            console.log("[delete] Error deleting the doc " + err);
            callback(err);
            return;
        }
        callback(undefined, success);
    });
};


