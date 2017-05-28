const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server :(');
    }
    console.log('Connected to Database :)');

    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('592a5763e0832f380b866b75')
    }, { $set: {
            name: 'Aziz',
            location: 'Midnapore'
        },
        $inc: {age: 1}
    }, {
        returnOriginal: false
    }).then((result) => {
        console.log(result);
    });

    // db.close();
});
