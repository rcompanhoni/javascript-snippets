const assert = require('assert');
const User = require('../src/user');

describe('Updating records', () => {
    let joe;

    beforeEach((done) => {
        joe = new User({ name: "Joe" });
        joe.save()
            .then(() => done());
    });

    // helper for verifying that the operation is actually modifying the 
    function assertName(operation, done) {
        operation
            .then(() => User.find({}))
            .then((users) => {
                assert(users.length === 1);
                assert(users[0].name === 'Alex');
                done();
            });
    }

    // use 'set' to update a single document property
    it('A model instance using set and save', (done) => {
        joe.set('name', 'Alex');
        assertName(joe.save(), done);
    });

    // use 'update' to inform an object with all the required updates
    it('A model instance using update', (done) => {
        assertName(joe.update({ name: 'Alex' }), done);
    });

    // updates all users named 'Joe' for 'Alex' 
    it('A model class can update', (done) => {
        assertName(User.update({ name: 'Joe'}, { name: 'Alex'}), done);
    });

    // updates a single user named 'Joe' for 'Alex' 
    it('A model class can update one record', (done) => {
        assertName(User.findOneAndUpdate({ name: 'Joe'}, { name: 'Alex'}), done);
    });

    it('A model class can find a record with an Id and update', (done) => {
        assertName(User.findByIdAndUpdate(joe._id, { name: 'Alex'}), done);
    });
});