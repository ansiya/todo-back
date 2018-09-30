const express = require('express');
const router = express.Router();

const Task = require('../controllers/taskController');

router.get('/', Task.list);
router.get('/:id', Task.getById);
router.post('/', Task.create);
router.put('/:id', Task.update);
router.delete('/:id', Task.remove);


module.exports = router;