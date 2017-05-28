const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server :(');
    }
    console.log('Connected to Database :)');

    db.collection('Users').findOneAndDelete({
        _id: new ObjectID('592a752331bbad3d2d36be37')
    }).then((result) => {
        console.log(result);
    });

    // db.close();
});
