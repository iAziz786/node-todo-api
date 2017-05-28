const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server :(');
    }
    console.log('Connected to Database :)');

    // db.collection('Todos').find().count().then((count) => {
    //     console.log(`You have ${count} todos`);
    // }, (err) => {
    //     console.log('Unable to fetch data', err);
    // });

    db.collection('Users').find({name: "Aziz"}).toArray().then((usr) => {
        console.log("Users find with name");
        console.log(JSON.stringify(usr, undefined, 2));
    }, (err) => {
        console.log('Unable to fetch the users');
    });

    // db.close();
});
