const assert = require('assert');
const User = require('../src/user');

describe('Virtual types', () => {
    it('requires a user name', (done) => {
        const joe = new User({
            name: 'Joe',
            posts: [{ title: 'Post Title' }]
        });

        joe.save()
            .then(() => User.findOne({ name: 'Joe' }))
            .then((user) => {
                assert(joe.postCount === 1);
                done();
            });
    });
});