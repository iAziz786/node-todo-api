const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');

// Todo.remove({}).then((result) => {
//     console.log(result);
// })

Todo.findByIdAndRemove('59366cb19f8080f6b30ac02c').then((todo) => {
    console.log(todo);
});
