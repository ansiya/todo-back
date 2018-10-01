var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
const mongoose = require("mongoose");


var indexRouter = require('./routes/index');
var taskRouter = require('./routes/taskRouter');
const db_Task = require('./connection/task');

var Task = require('./models/task.js');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "content-type");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    const dbo = db.db("todo");
    dbo.createCollection("tasks", function(err, res) {
        if (err) throw err;
        console.log("Collection created!");
        db.close();
    });
});

app.use('/', indexRouter);
app.use('/tasks', taskRouter);


app.listen(3000);

let task1 = new Task({
    _id: new mongoose.Types.ObjectId(),
    description: "Test an App",
    startDate: new Date(),
    finishDate: new Date(2018, 9, 3)
});

let task2 = new Task({
    _id: new mongoose.Types.ObjectId(),
    description: "Feed the cat",
    startDate: new Date(2018, 8, 26),
    finishDate: new Date(2018, 8, 27)
});

let task3 = new Task({
    _id: new mongoose.Types.ObjectId(),
    description: "Write an email",
    startDate: new Date(2018, 8, 27),
    finishDate: new Date(2018, 8, 28)
});

db_Task.list(function(err, success){
    if(success.length === 0){
        db_Task.create(task1, function (err, success) {
            if (err) {
                console.log('Error while creating task1');
            }
        });

        db_Task.create(task2, function (err, success) {
            if (err) {
                console.log('Error while creating task2');
            }
        });

        db_Task.create(task3, function (err, success) {
            if (err) {
                console.log('Error while creating task3');
            }
        });
    }
});



// mongoose.connect('mongodb://localhost:27017/todo')
//     .then(() => console.log('Connected to MongoDB...'))
//     .catch(err => console.error('Could not connect to MongoDB...', err));




// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
