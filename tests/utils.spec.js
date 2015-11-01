var mediator = require('../mediator');
var sinon = require('sinon');

describe('Utils spec', function () {
  it('#each object collection', function () {
    var iterator = sinon.spy();
    var _ = mediator._;
    var collection = {
      'key1': 'value 1',
      'key2': 'value 2'
    };

    _.each(collection, iterator);

    iterator.calledTwice.should.be.true();
    iterator.getCall(0).args.should.match(['value 1', 'key1']);
    iterator.getCall(1).args.should.match(['value 2', 'key2']);
  });

  it('#each array collection', function () {
    var iterator = sinon.spy();
    var _ = mediator._;
    var array = [1, 2];

    _.each(array, iterator);

    iterator.calledTwice.should.be.true();
    iterator.getCall(0).args.should.match([1, 0]);
    iterator.getCall(1).args.should.match([2, 1]);
  });
});