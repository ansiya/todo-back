const mongoose = require('mongoose');
const db_Task = require('../connection/task');

exports.list = (req, res) => {
    /*
       Function to get all tasks
       curl -X GET http://localhost:3000/tasks
   */

    // To check if the connection is available / To establish the Database connection
    db_Task.connectToDb(function (error) {
        if (error) {
            return res.status(500).json({msg: "Error connecting to db", status: "CONNECTION_ERROR"});
        }
        // To get the information of a Leader
        db_Task.list(function (err, success) {
            if (err) {
                return res.status(500).json({msg: "Error retrieving the info", status: "CONNECTION_ERROR"});
            }
            res.status(200).json({doc: success});
        });
    });
};

exports.getById = (req, res) => {
    const params = req.params || {};

    if (mongoose.Types.ObjectId.isValid(params.id)) {

        // const task = tasks.find(c => c.id === parseInt(req.params.id));
        // if(!task) return res.status(404).send('The task with given id does not found!');
        // res.send(task);
        db_Task.connectToDb(function (error) {
            if (error) {
                return res.status(500).json({msg: "Error connecting to db", status: "CONNECTION_ERROR"});
            }
            // To get the information of a Leader
            db_Task.getById(params.id, function (err, success) {
                if (err) {
                    return res.status(500).json({msg: "Error retrieving the info", status: "CONNECTION_ERROR"});
                }
                if(!success){
                    return res.status(404).json({msg: "Task with this ID wasn't found.", status: "CONNECTION_ERROR"});
                }
                res.status(200).json({doc: success});
            });
        });
    }
    else {
        return res.status(500).json({msg: "Error with params: invalid id", status: "QUERY_ERROR"});
    }
};

exports.create = (req, res) => {
    // const data = Object.assign({}, req.body, { task: req.task }) || {};

    if (!req.body.description) return res.status(400).send("Description is required!");
    if (!req.body.finishDate) return res.status(400).send("Finish Date is required!");

    // To check if the connection is available / To establish the Database connection
    db_Task.connectToDb(function (error) {
        if (error) {
            return res.status(500).json({"msg": "error connecting to db", status: "CONNECTION_ERROR"});
        }
        // If the DB is connected then Create / Update the doc
        db_Task.create(req.body, function (err, success) {
            if (err) {
                return res.status(500).json({"msg": "error updating info", status: "CONNECTION_ERROR"});
            }
            res.status(200).json({msg: success});
        });
    });
};

exports.update = (req, res) => {
    const params = req.params || {};
    // const task = tasks.find(c => c.id === parseInt(req.params.id));
    // if(!task) return res.status(404).send('The task with given id does not found!');
    //
    // if(!req.body.name) return res.status(400).send("Name is required!");
    //
    // task.name = req.body.name;
    // res.send(task);

    if (!req.body.description) return res.status(400).send("Description is required!");
    if (!req.body.finishDate) return res.status(400).send("Finish Date is required!");

    if (mongoose.Types.ObjectId.isValid(params.id)) {
        db_Task.connectToDb(function (error) {
            if (error) {
                return res.status(500).json({"msg": "error connecting to db", status: "CONNECTION_ERROR"});
            }
            // If the DB is connected then Create / Update the doc
            db_Task.update(req.params.id, req.body, function (err, success) {
                if (err) {
                    return res.status(500).json({"msg": "error updating info. " + err, status: "CONNECTION_ERROR"});
                }
                res.status(200).json({msg: success});
            });
        });
    }
    else {
        return res.status(500).json({msg: "Error with params: invalid id", status: "QUERY_ERROR"});
    }


};

exports.remove = (req, res) => {
    const params = req.params || {};
    //Without MongoDB
    // const task = tasks.find(c => c.id === parseInt(req.params.id));
    // if(!task) return res.status(404).send('The task with given id does not found!');

    // const index = task.indexOf(task);
    // task.splice(index, 1);

    /*
        Function to delete the task
        curl -X DELETE http://localhost:3000/tasks/:id
    */
    // To check if the connection is available / To establish the Database connection
    if (mongoose.Types.ObjectId.isValid(params.id)) {
        db_Task.connectToDb(function (error) {
            if (error) {
                return res.status(500).json({msg: "Error connecting to db", status: "CONNECTION_ERROR"});
            }
            // To delete the information of a task
            db_Task.remove(req.params.id, function (err, success) {
                if (err) {
                    return res.status(500).json({msg: "Error retrieving the info", status: "CONNECTION_ERROR"});
                }
                res.status(200).json({doc: success});
            });
        });
    } else {
        return res.status(500).json({msg: "Error with params: invalid id", status: "QUERY_ERROR"});
    }

};