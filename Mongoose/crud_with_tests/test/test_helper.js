const mongoose = require('mongoose');

// uses ES6 implementation of Promises available through Node's global variable
mongoose.promise = global.Promise;

// connect to the MongoDB once, before any test
before((done) => {
    mongoose.connect('mongodb://localhost/users_test');
    mongoose.connection
        .once('open', () => { done(); })
        .on('error', (error) => {
            console.warn('Warning', error);
        });
});

// using mocha's 'done' callback
beforeEach((done) => {
    mongoose.connection.collections.users.drop(() => {
        done();
    });
});