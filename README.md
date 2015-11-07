<a name="MediatorDefinition"></a>
## MediatorDefinition : <code>object</code>
**Kind**: global namespace  

* [MediatorDefinition](#MediatorDefinition) : <code>object</code>
  * [.EventEmitter](#MediatorDefinition.EventEmitter)
    * [new EventEmitter()](#new_MediatorDefinition.EventEmitter_new)
    * [.on(eventName, handler)](#MediatorDefinition.EventEmitter+on)
    * [.once(eventName, handler)](#MediatorDefinition.EventEmitter+once)
    * [.off(eventName, |handler|)](#MediatorDefinition.EventEmitter+off)
    * [.emit(eventName)](#MediatorDefinition.EventEmitter+emit)
    * [.toString()](#MediatorDefinition.EventEmitter+toString) ⇒ <code>string</code>
  * [.Mediator](#MediatorDefinition.Mediator)
    * [new Mediator(eventEmitter, setting)](#new_MediatorDefinition.Mediator_new)
    * _instance_
      * [.addComponent(name, registrator)](#MediatorDefinition.Mediator+addComponent)
      * [.removeComponent(name)](#MediatorDefinition.Mediator+removeComponent) ⇒ <code>boolean</code>
      * [.hasComponent(name)](#MediatorDefinition.Mediator+hasComponent) ⇒ <code>boolean</code>
      * [.getComponent(name)](#MediatorDefinition.Mediator+getComponent) ⇒ <code>Object</code>
      * [.componentsList()](#MediatorDefinition.Mediator+componentsList) ⇒ <code>Array</code>
      * [.shareResponsibility(mediator)](#MediatorDefinition.Mediator+shareResponsibility)
      * [.toString()](#MediatorDefinition.Mediator+toString) ⇒ <code>string</code>
    * _static_
      * [.EVENTS](#MediatorDefinition.Mediator.EVENTS)
        * [.ADD](#MediatorDefinition.Mediator.EVENTS.ADD)
        * [.REMOVE](#MediatorDefinition.Mediator.EVENTS.REMOVE)

<a name="MediatorDefinition.EventEmitter"></a>
### MediatorDefinition.EventEmitter
**Kind**: static class of <code>[MediatorDefinition](#MediatorDefinition)</code>  

* [.EventEmitter](#MediatorDefinition.EventEmitter)
  * [new EventEmitter()](#new_MediatorDefinition.EventEmitter_new)
  * [.on(eventName, handler)](#MediatorDefinition.EventEmitter+on)
  * [.once(eventName, handler)](#MediatorDefinition.EventEmitter+once)
  * [.off(eventName, |handler|)](#MediatorDefinition.EventEmitter+off)
  * [.emit(eventName)](#MediatorDefinition.EventEmitter+emit)
  * [.toString()](#MediatorDefinition.EventEmitter+toString) ⇒ <code>string</code>

<a name="new_MediatorDefinition.EventEmitter_new"></a>
#### new EventEmitter()
EventEmitter - provides event-driven system

<a name="MediatorDefinition.EventEmitter+on"></a>
#### eventEmitter.on(eventName, handler)
Method provide ability to subscribe on some event by name and react on it by handler

**Kind**: instance method of <code>[EventEmitter](#MediatorDefinition.EventEmitter)</code>  

| Param | Type |
| --- | --- |
| eventName | <code>string</code> | 
| handler | <code>function</code> | 

<a name="MediatorDefinition.EventEmitter+once"></a>
#### eventEmitter.once(eventName, handler)
Method allows to subscribe on some event and unsubscribe automatically after event will happen

**Kind**: instance method of <code>[EventEmitter](#MediatorDefinition.EventEmitter)</code>  

| Param | Type |
| --- | --- |
| eventName | <code>string</code> | 
| handler | <code>function</code> | 

<a name="MediatorDefinition.EventEmitter+off"></a>
#### eventEmitter.off(eventName, |handler|)
Method allows to remove subscription for specify handler of all event if handler is not defined

**Kind**: instance method of <code>[EventEmitter](#MediatorDefinition.EventEmitter)</code>  

| Param | Type |
| --- | --- |
| eventName | <code>string</code> | 
| |handler| | <code>function</code> | 

<a name="MediatorDefinition.EventEmitter+emit"></a>
#### eventEmitter.emit(eventName)
Method allows to trigger all handler which are subscribed on some event and also pass any number of arguments

**Kind**: instance method of <code>[EventEmitter](#MediatorDefinition.EventEmitter)</code>  

| Param |
| --- |
| eventName | 

<a name="MediatorDefinition.EventEmitter+toString"></a>
#### eventEmitter.toString() ⇒ <code>string</code>
Overriding of standart toString method

**Kind**: instance method of <code>[EventEmitter](#MediatorDefinition.EventEmitter)</code>  
**Returns**: <code>string</code> - Returns string '[object EventEmitter]'  
<a name="MediatorDefinition.Mediator"></a>
### MediatorDefinition.Mediator
**Kind**: static class of <code>[MediatorDefinition](#MediatorDefinition)</code>  

* [.Mediator](#MediatorDefinition.Mediator)
  * [new Mediator(eventEmitter, setting)](#new_MediatorDefinition.Mediator_new)
  * _instance_
    * [.addComponent(name, registrator)](#MediatorDefinition.Mediator+addComponent)
    * [.removeComponent(name)](#MediatorDefinition.Mediator+removeComponent) ⇒ <code>boolean</code>
    * [.hasComponent(name)](#MediatorDefinition.Mediator+hasComponent) ⇒ <code>boolean</code>
    * [.getComponent(name)](#MediatorDefinition.Mediator+getComponent) ⇒ <code>Object</code>
    * [.componentsList()](#MediatorDefinition.Mediator+componentsList) ⇒ <code>Array</code>
    * [.shareResponsibility(mediator)](#MediatorDefinition.Mediator+shareResponsibility)
    * [.toString()](#MediatorDefinition.Mediator+toString) ⇒ <code>string</code>
  * _static_
    * [.EVENTS](#MediatorDefinition.Mediator.EVENTS)
      * [.ADD](#MediatorDefinition.Mediator.EVENTS.ADD)
      * [.REMOVE](#MediatorDefinition.Mediator.EVENTS.REMOVE)

<a name="new_MediatorDefinition.Mediator_new"></a>
#### new Mediator(eventEmitter, setting)
Mediator - Provide ability to you create a simple mediator to control interaction among components based on low coupling


| Param | Type |
| --- | --- |
| eventEmitter | <code>EventEmitter</code> | 
| setting | <code>Object</code> | 

<a name="MediatorDefinition.Mediator+addComponent"></a>
#### mediator.addComponent(name, registrator)
Method provides ability to add component

**Kind**: instance method of <code>[Mediator](#MediatorDefinition.Mediator)</code>  

| Param | Type |
| --- | --- |
| name | <code>string</code> | 
| registrator | <code>function</code> | 

<a name="MediatorDefinition.Mediator+removeComponent"></a>
#### mediator.removeComponent(name) ⇒ <code>boolean</code>
Method removes existing component, unattached event handlers for component and remove dependencies

**Kind**: instance method of <code>[Mediator](#MediatorDefinition.Mediator)</code>  
**Returns**: <code>boolean</code> - True if component was removed in opposite false  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Component Name |

<a name="MediatorDefinition.Mediator+hasComponent"></a>
#### mediator.hasComponent(name) ⇒ <code>boolean</code>
Method provides you ability to check component existence by name

**Kind**: instance method of <code>[Mediator](#MediatorDefinition.Mediator)</code>  

| Param |
| --- |
| name | 

<a name="MediatorDefinition.Mediator+getComponent"></a>
#### mediator.getComponent(name) ⇒ <code>Object</code>
Method provides component by name

**Kind**: instance method of <code>[Mediator](#MediatorDefinition.Mediator)</code>  

| Param |
| --- |
| name | 

<a name="MediatorDefinition.Mediator+componentsList"></a>
#### mediator.componentsList() ⇒ <code>Array</code>
Method provides components' names list for all registered components

**Kind**: instance method of <code>[Mediator](#MediatorDefinition.Mediator)</code>  
**Returns**: <code>Array</code> - Array that contains string names of each registered component  
<a name="MediatorDefinition.Mediator+shareResponsibility"></a>
#### mediator.shareResponsibility(mediator)
Method can be used if you want to share events among several mediators in application

**Kind**: instance method of <code>[Mediator](#MediatorDefinition.Mediator)</code>  

| Param | Type |
| --- | --- |
| mediator | <code>Mediator</code> | 

<a name="MediatorDefinition.Mediator+toString"></a>
#### mediator.toString() ⇒ <code>string</code>
Return string for Instance of Mediator [object Mediator]

**Kind**: instance method of <code>[Mediator](#MediatorDefinition.Mediator)</code>  
<a name="MediatorDefinition.Mediator.EVENTS"></a>
#### Mediator.EVENTS
**Kind**: static constant of <code>[Mediator](#MediatorDefinition.Mediator)</code>  

  * [.EVENTS](#MediatorDefinition.Mediator.EVENTS)
    * [.ADD](#MediatorDefinition.Mediator.EVENTS.ADD)
    * [.REMOVE](#MediatorDefinition.Mediator.EVENTS.REMOVE)

<a name="MediatorDefinition.Mediator.EVENTS.ADD"></a>
##### EVENTS.ADD
Event with this name is emitted every time when new component is registered in system

**Kind**: static constant of <code>[EVENTS](#MediatorDefinition.Mediator.EVENTS)</code>  
<a name="MediatorDefinition.Mediator.EVENTS.REMOVE"></a>
##### EVENTS.REMOVE
Event with this name is emitted every time when component is removed in system

**Kind**: static constant of <code>[EVENTS](#MediatorDefinition.Mediator.EVENTS)</code>  
