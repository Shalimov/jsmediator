var mediator = require('../mediator');
var sinon = require('sinon');

describe('Mediator spec', function () {

  function alarmRegisterFn(emit) {
    function Alarm(time) {
      this.alarmTime = time;
    }

    Alarm.prototype.doAlarm = function () {
      emit('alarm', this.alarmTime);
    };

    return {
      alarmClock: new Alarm('9:30PM')
    };
  }

  function coffeeMachineRegisterFn(emit) {
    function CoffeeMachine() {
    }

    CoffeeMachine.prototype.makeCoffee = sinon.spy();

    var coffeeMachine = new CoffeeMachine();

    return {
      coffeeMachine: coffeeMachine,
      onEvents: {
        alarm: function (time) {
          coffeeMachine.makeCoffee('Latte');
        }
      }
    };
  }

  function toasterMachineRegisterFn(emit) {
    function Toaster() {

    }

    Toaster.prototype.makeToast = sinon.spy();

    var toaster = new Toaster();

    return {
      toaster: toaster,
      onEvents: {
        alarm: function () {
          toaster.makeToast('Hot toast');
        }
      }
    };
  }

  var smartHouseMediator;

  beforeEach(function () {
    smartHouseMediator = new mediator.Mediator(new mediator.EventEmitter());
  });

  it('should #addComponent and register events and remove onEvents meta from descriptor object', function () {
    smartHouseMediator.componentsList().should.have.length(0);

    smartHouseMediator.addComponent('CoffeeMachine', coffeeMachineRegisterFn);

    smartHouseMediator.componentsList().should.have.length(1);
    smartHouseMediator.componentsList().should.be.eql(['CoffeeMachine']);

    var component = smartHouseMediator.getComponent('CoffeeMachine');
    component.should.not.have.property('onEvents');
  });

  it('should #broadcast events into system', function () {
    smartHouseMediator.addComponent('Alarm', alarmRegisterFn);
    smartHouseMediator.addComponent('CoffeeMachine', coffeeMachineRegisterFn);
    smartHouseMediator.addComponent('Toaster', toasterMachineRegisterFn);

    var alarm = smartHouseMediator.getComponent('Alarm').alarmClock;
    var toaster = smartHouseMediator.getComponent('Toaster').toaster;
    var coffeeMachine = smartHouseMediator.getComponent('CoffeeMachine').coffeeMachine;

    toaster.makeToast.called.should.not.be.true();
    coffeeMachine.makeCoffee.should.not.be.true();

    alarm.doAlarm();

    toaster.makeToast.calledOnce.should.be.true();
    coffeeMachine.makeCoffee.calledOnce.should.be.true();
  });
});