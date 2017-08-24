const mongoose = require('mongoose');

// uses ES6 implementation of Promises available through Node's global variable
mongoose.Promise = global.Promise;

// connect to the MongoDB once, before any test
before((done) => {
    mongoose.connect('mongodb://localhost/users_test', { useMongoClient: true });
    mongoose.connection
        .once('open', () => { done(); })
        .on('error', (error) => {
            console.warn('Warning', error);
        });
});

// using mocha's 'done' callback
beforeEach((done) => {
    const { users, comments, blogposts } = mongoose.connection.collections;
    users.drop(() => {
        comments.drop(()=> {
            blogposts.drop(() => {
                done();
            });
        });
    });
});