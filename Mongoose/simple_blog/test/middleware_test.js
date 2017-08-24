const assert = require('assert');
const User = require('../src/user');
const BlogPost = require('../src/blogPost');

describe("Middleware", () => {
    let joe, blogPost;

    beforeEach((done) => {
        joe = new User({ name: 'Joe' });
        blogPost = new BlogPost( { title: 'JS is Great', content: 'Yep it really is' });

        // relationships 
        joe.blogPosts.push(blogPost);

        // Promise.all encapsulates the execution of all async operations
        Promise.all([ joe.save(), blogPost.save() ])
            .then(() => done())
    });

    it('users clean up dangling blogposts on remove', (done) => {
        joe.remove()
            .then(() => BlogPost.count())
            .then((count) => {
                assert(count === 0);
                done();
            });
    });
});