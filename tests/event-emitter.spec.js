var mediator = require('../mediator');
var sinon = require('sinon');

describe('EventEmitter spec', function () {
  var eventEmitter;
  var spyHandler;

  beforeEach(function () {
    eventEmitter = new mediator.EventEmitter();
    spyHandler = sinon.spy();
  });

  it('check on + emit without args + off', function () {
    eventEmitter.on('some:event', spyHandler);
    spyHandler.called.should.be.not.true();

    eventEmitter.emit('some:event');
    spyHandler.calledOnce.should.be.true();

    eventEmitter.emit('some:event');
    spyHandler.calledTwice.should.be.true();

    eventEmitter.off('some:event');
    eventEmitter.emit('some:event');
    spyHandler.calledTwice.should.be.true();
  });


  it('check on + emit with args', function () {
    eventEmitter.on('some:event', spyHandler);
    eventEmitter.emit('some:event', ['args1', 'args2'], {key: 'value'});
    spyHandler.calledOnce.should.be.true();
    spyHandler.getCall(0).args.should.match([['args1', 'args2'], {key: 'value'}]);

    eventEmitter.emit('some:event', 1, 2, 3, 4);
    spyHandler.calledTwice.should.be.true();
    spyHandler.getCall(1).args.should.match([1, 2, 3, 4]);

    eventEmitter.off('some:event');
    eventEmitter.emit('some:event');
    spyHandler.calledTwice.should.be.true();
  });

  it('check once + emit', function () {
    eventEmitter.once('some:event', spyHandler);
    spyHandler.called.should.be.not.true();

    eventEmitter.emit('some:event');
    spyHandler.calledOnce.should.be.true();

    eventEmitter.emit('some:event');
    spyHandler.calledOnce.should.be.true();
  });
});