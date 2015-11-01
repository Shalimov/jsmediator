var mediator = require('../mediator');
var sinon = require('sinon');

describe('Utils spec', function () {
  it('should iterate over {Object} props by using #each and return appropriate values for each step of iteration', function () {
    var iterator = sinon.spy();
    var _ = mediator._;
    var collection = {
      'key1': 'value 1',
      'key2': 'value 2'
    };

    _.each(collection, iterator);

    iterator.calledTwice.should.be.True;
    iterator.getCall(0).args.should.match(['value 1', 'key1']);
    iterator.getCall(1).args.should.match(['value 2', 'key2']);
  });

  it('should iterate over {Array} indexes by using #each and return appropriate values for each step of iteration', function () {
    var iterator = sinon.spy();
    var _ = mediator._;
    var array = [1, 2];

    _.each(array, iterator);

    iterator.calledTwice.should.be.True;
    iterator.getCall(0).args.should.match([1, 0]);
    iterator.getCall(1).args.should.match([2, 1]);
  });
});