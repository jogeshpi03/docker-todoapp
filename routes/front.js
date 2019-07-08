const express = require('express');
const Todo = require('./../models/Todo');

const router = express.Router();


router.get('/', (req, res) => {

    Todo.find({}, (err, todos) => {

        if(Object.keys(todos).length > 0) {
            res.render("todos", {
                tasks: todos
            });
        }
        else {
            res.render("todos", {
                tasks: {}
            });
        }
    });
});

// POST - Submit Task
router.post('/', (req, res) => {
    const newTask = new Todo({
        task: req.body.task
    });

    newTask.save()
    .then(task => res.redirect('/'))
    .catch(err => console.log(err));
});

// POST - Destroy todo item
router.post('/todo/destroy', (req, res) => {
    const taskKey = req.body._key;

    Todo.findOneAndRemove({_id: taskKey}, (err) => {

        if(err) console.log(err);
        res.redirect('/');
    });
});


module.exports = router;