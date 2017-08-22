const assert = require('assert');
const User = require('../src/user');

describe('Subdocuments', () => {
    it('Can create a subdocument', (done) => {
        const joe = new User({
            name: 'Joe',
            posts: [{ title: 'Post Title' }]
        });

        joe.save()
            .then(() => User.findOne({ name: 'Joe' }))
            .then((user) => {
                assert(user.posts[0].title === 'Post Title');
                done();
            });
    });

    it('Can add subdocuments to an existing record', (done) => {
        const joe = new User({
            name: 'Joe',
            posts: []
        });

        joe.save()
            .then(() => User.findOne({ name: 'Joe' }))
            .then((user) => {
                user.posts.push({ title: 'New Post' });
                return user.save();
            })
            .then(() => User.findOne({ name: 'Joe' }))
            .then((user) => {
                assert(user.posts[0].title === 'New Post');
                done();
            });
    });

    it('Can remove an existing subdocument', (done) => {
        const joe = new User({
            name: 'Joe',
            posts: [{ title: 'Post Title' }]
        });

        joe.save()
            .then(() => User.findOne({ name: 'Joe' }))
            .then((user) => {
                // remove() is a Mongoose method -- you could also use splice. Notice that we still have to call save on the parent document (i.e. user)
                const post = user.posts[0];
                post.remove();
                return user.save();
            })
            .then(() => User.findOne({ name: 'Joe' }))
            .then((user) => {
                assert(user.posts.length === 0);
                done();
            });
    });
});