const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Users} = require('./../server/models/user');

var id = '5933e5c325aede1935bdc03b';

if (!ObjectID.isValid(id)) {
    console.log('Invalid user ID');
}

// if (!ObjectID.isValid(id)) {
//     console.log('This is an invalid ID');
// }

// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('Todos', todos);
// });
//
// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('Todo', todo);
// });

// Todo.findById(id).then((todo) => {
//     if (!todo) {
//         return console.log('Id not found');
//     }
//     console.log('Todo By Id', todo);
// }).catch((e) => console.log(e.message))

Users.findById(id).then((user) => {
    if (!user) {
        return console.log('User is not found');
    }
    console.log('User: ', user);
}).catch((e) => {
    console.log(e.message);
})
