const assert = require('assert');
const User = require('../src/user');

describe('Creating records', () => {
    it('saves a user', (done) => {
        const joe = new User({
            name: 'Joe'
        });

        joe.save()
            .then(() => {
                // uses mongoose 'isNew' to check if the user is already created in the DB
                assert(!joe.isNew);
                done();
            });
    });
});