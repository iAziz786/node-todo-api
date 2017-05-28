const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server :(');
    }
    console.log('Connected to Database :)');

    // db.collection('Todos').insertOne({
    //     text: 'Something to do',
    //     complete: false
    // }, (err, result) => {
    //     if (err) {
    //         return console.log('Unable to insert todos', err);
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });
    db.collection('Users').insertOne({
        name: 'Aziz',
        age: 21,
        location: 'Midnapore'
    }, (err, result) => {
        if (err) {
            return console.log('Unable to insert todos', err);
        }
        // console.log(JSON.stringify(result.ops, undefined, 2));
        console.log(result.ops[0]._id.getTimestamp());
    });

    db.close();
});
