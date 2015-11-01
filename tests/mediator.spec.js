var mediator = require('../mediator');
var should = require('should');
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

  afterEach(function () {
    smartHouseMediator.removeComponent('CoffeeMachine');
    smartHouseMediator.removeComponent('Alarm');
    smartHouseMediator.removeComponent('Toaster');
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

    toaster.makeToast.called.should.be.True;
    coffeeMachine.makeCoffee.should.be.True;

    alarm.doAlarm();

    toaster.makeToast.calledOnce.should.be.True;
    coffeeMachine.makeCoffee.calledOnce.should.be.True;
  });

  it('should #removeComponent and unsubscribe from events', function () {
    smartHouseMediator.addComponent('Alarm', alarmRegisterFn);
    smartHouseMediator.addComponent('CoffeeMachine', coffeeMachineRegisterFn);
    smartHouseMediator.addComponent('Toaster', toasterMachineRegisterFn);

    var alarm = smartHouseMediator.getComponent('Alarm').alarmClock;
    var toaster = smartHouseMediator.getComponent('Toaster').toaster;
    var coffeeMachine = smartHouseMediator.getComponent('CoffeeMachine').coffeeMachine;

    toaster.makeToast.called.should.be.False;
    coffeeMachine.makeCoffee.should.be.False;

    alarm.doAlarm();

    toaster.makeToast.calledOnce.should.be.True;
    coffeeMachine.makeCoffee.calledOnce.should.be.True;

    smartHouseMediator.removeComponent('CoffeeMachine').should.be.true();

    alarm.doAlarm();

    toaster.makeToast.calledTwice.should.be.True;
    coffeeMachine.makeCoffee.calledOnce.should.be.True;
  });


  it('should #removeComponent and stop to emit events inside the system', function () {
    smartHouseMediator.addComponent('Alarm', alarmRegisterFn);
    smartHouseMediator.addComponent('CoffeeMachine', coffeeMachineRegisterFn);
    smartHouseMediator.addComponent('Toaster', toasterMachineRegisterFn);

    var alarm = smartHouseMediator.getComponent('Alarm').alarmClock;
    var toaster = smartHouseMediator.getComponent('Toaster').toaster;
    var coffeeMachine = smartHouseMediator.getComponent('CoffeeMachine').coffeeMachine;

    toaster.makeToast.called.should.be.False;
    coffeeMachine.makeCoffee.should.be.False;

    alarm.doAlarm();

    toaster.makeToast.calledOnce.should.be.True;
    coffeeMachine.makeCoffee.calledOnce.should.be.True;

    smartHouseMediator.removeComponent('Alarm').should.be.true();

    should.throws(alarm.doAlarm.bind(alarm));

    toaster.makeToast.calledOnce.should.be.true();
    coffeeMachine.makeCoffee.calledOnce.should.be.true();
  });

  it('should #getComponent by name or return undefinded if component does not exist', function () {
    smartHouseMediator.addComponent('CoffeeMachine', coffeeMachineRegisterFn);
    smartHouseMediator.addComponent('Toaster', toasterMachineRegisterFn);

    var toasterComponent = smartHouseMediator.getComponent('Toaster');
    toasterComponent.should.be.an.Object;

    var fakeComponent = smartHouseMediator.getComponent('Halo');
    should(fakeComponent).be.an.Undefined;
  });

  it('should check for component existance by using #hasComponent', function () {
    smartHouseMediator.addComponent('CoffeeMachine', coffeeMachineRegisterFn);

    smartHouseMediator.hasComponent('Toaster').should.be.False;
    smartHouseMediator.hasComponent('CoffeeMachine').should.be.True;
  });

  it('should list of string names with all registered component', function () {
    smartHouseMediator.componentsList().should.have.length(0);

    smartHouseMediator.addComponent('CoffeeMachine', coffeeMachineRegisterFn);
    smartHouseMediator.addComponent('Toaster', coffeeMachineRegisterFn);

    smartHouseMediator.componentsList().should.have.length(2);
    smartHouseMediator.componentsList().should.be.eql(['CoffeeMachine', 'Toaster']);

    smartHouseMediator.removeComponent('Toaster');

    smartHouseMediator.componentsList().should.have.length(1);
    smartHouseMediator.componentsList().should.be.eql(['CoffeeMachine']);

    smartHouseMediator.removeComponent('CoffeeMachine');

    smartHouseMediator.componentsList().should.have.length(0);
  });
});