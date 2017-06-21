// NAMING
// * default format for scenario names: <ROLE>_<ACTION>_<ENTITY>
// * tests must be defined using the present tense
// * be explicit about the actions that are possible and the ones that are not for an empty order

// ARCHITECTURE
// orderSystem is like a 'application service' object, dependent of the orderDAO, which is being stubbed here
// If we are using a DAO framework (ORM/ODM) that imposes some constraints on the interface of the DAO (e.g. Mongoose), we just need to consult the documentation

// STEP BY STEP
// Overall order of development
// 1. Initial definition of feature, contexts and test cases
// 2. Define service/DAO initialization (stub) in the before/beforeEach methods
// 3. Define the expectations for each test case -- example:
//      it('will show no order items', function () {
//          expect(this.result)
//              .to.have.property('items')
//              .that.is.empty;
//      });
// 4. 

'use strict';

var chai = require('chai'),
    expect = chai.expect,
    sinon = require('sinon'),
    orderSystemWith = require('../lib/orders');

describe('Customer displays order', function () {
    beforeEach(function () {
        var orderDAO = {
            byId: sinon.stub()
        };

        this.orderSystem = orderSystemWith(orderDAO);
    });

    context('Given that the order is empty', function () {
        beforeEach(function () {
            this.orderId = 'some empty order id';
            this.orderDAO.byId.withArgs(this.orderId).returns([]);

            this.result = this.orderSystem.display(this.orderId);
        });

        it('will show no order items', function () {
            expect(this.result)
                .to.have.property('items')
                .that.is.empty;
        });

        it('will show 0 as total price', function () {
            expect(this.result)
                .to.have.property('totalPrice')
                .that.is.equal(0);
        });

        it('will only be possible to add a beverage', function () {
            expect(this.result).to.have.property('actions')
                .that.is.deep.equal([{
                    action: 'append-beverage',
                    target: this.orderId,
                    parameters: {
                        beverageRef: null,
                        quantity: 0
                    }
                }]);
        });
    });

    context('Given that the order contains beverages', function () {
        it('will show one item per beverage');
        it('will show the sum of the unit prices as total price');
        it('will be possible to place the order');
        it('will be possible to add a beverage');
        it('will be possible to remove a beverage');
        it('will be possible to change the quantity of a beverage');
    });

    context('Given that the order has pending messages', function () {
        it('will show the pending messages');
        it('there will be no more pending messages');
    });
});