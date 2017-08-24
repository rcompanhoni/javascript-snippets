const assert = require('assert');
const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');

describe("Associations", () => {
    let joe, blogPost, comment;

    beforeEach((done) => {
        joe = new User({ name: 'Joe' });
        blogPost = new BlogPost( { title: 'JS is Great', content: 'Yep it really is' });
        comment = new Comment({ content: 'Congrats on great post' });

        // relationships 
        joe.blogPosts.push(blogPost);
        blogPost.comments.push(comment);
        comment.user = joe;

        // Promise.all encapsulates the execution of all async operations
        Promise.all([ joe.save(), blogPost.save(), comment.save() ])
            .then(() => done())
    });

    // uses the populate modifier to include the 'blogPosts' along with the fetched user -- NOTE: each blogPost will not bring its whole comment reference
    it('saves a relation between a user and a blogpost', (done) => {
        User.findOne({ name: 'Joe'})
            .populate('blogPosts')
            .then((user) => {
                assert(user.blogPosts[0].title === 'JS is Great');
                done();
            });
    });

    // uses the populate modifier to include the 'blogPosts' along with the fetched user -- NOTE: it uses an object to indicate that each blogPost will be 
    // fetched along with its comments. 
    it('saves a full relation graph', (done) => {
        User.findOne({ name: 'Joe'})
            .populate({
                path: 'blogPosts',
                populate: {
                    path: 'comments',
                    model: 'comment',
                    populate: {
                        path: 'user',
                        model: 'user'
                    }
                }
            })
            .then((user) => {
                assert(user.name === 'Joe');
                assert(user.blogPosts[0].title === 'JS is Great');
                assert(user.blogPosts[0].comments[0].content === 'Congrats on great post');
                assert(user.blogPosts[0].comments[0].user.name === 'Joe');
                done();
            });
    });
});