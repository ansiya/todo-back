const express = require('express');
const router = express.Router();

const tasks = [
    {id: 1, name: 'Task 1'},
    {id: 2, name: 'Task 2'},
    {id: 3, name: 'Task 3'}
];

/* GET TASKS. */
router.get('/', function(req, res, next) {
    res.send(tasks);
});

/* FIND A TASK */
router.get('/:id', function(req, res, next){
    const task = tasks.find(c => c.id === parseInt(req.params.id));
    if(!task) return res.status(404).send('The task with given id does not found!');
    res.send(task);
});

/* CREATE A TASK */
router.post('/', function (req, res, next) {
    if(!req.body.name) return res.status(400).send("Name is required!");

    const task = {
        id: tasks.length + 1,
        name: req.body.name
    };
    tasks.push(task);
    res.send(tasks);
});

/* UPDATE A TASK */
router.put('/:id', function(req, res, next){
    const task = tasks.find(c => c.id === parseInt(req.params.id));
    if(!task) return res.status(404).send('The task with given id does not found!');

    if(!req.body.name) return res.status(400).send("Name is required!");

    task.name = req.body.name;
    res.send(task);
});

/* DELETE A TASK */
router.delete('/:id', function(req, res, next){
    const task = tasks.find(c => c.id === parseInt(req.params.id));
    if(!task) return res.status(404).send('The task with given id does not found!');

    const index = tasks.indexOf(task);
    tasks.splice(index, 1);

    res.send(task);
});

module.exports = router;