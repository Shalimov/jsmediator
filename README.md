<a name="global"></a>
## global : <code>object</code>
**Kind**: global namespace  

* [global](#global) : <code>object</code>
  * [.EventEmitter](#global.EventEmitter)
    * [new EventEmitter()](#new_global.EventEmitter_new)
    * [.on(eventName, handler)](#global.EventEmitter+on)
    * [.once(eventName, handler)](#global.EventEmitter+once)
    * [.off(eventName, [handler])](#global.EventEmitter+off)
    * [.emit(eventName, List)](#global.EventEmitter+emit)
    * [.toString()](#global.EventEmitter+toString) ⇒ <code>string</code>
  * [.Mediator](#global.Mediator)
    * [new Mediator(eventEmitter, setting)](#new_global.Mediator_new)
    * _instance_
      * [.addComponent(name, registrator)](#global.Mediator+addComponent)
      * [.removeComponent(name)](#global.Mediator+removeComponent) ⇒ <code>boolean</code>
      * [.hasComponent(name)](#global.Mediator+hasComponent) ⇒ <code>boolean</code>
      * [.getComponent(name)](#global.Mediator+getComponent) ⇒ <code>Object</code>
      * [.componentsList()](#global.Mediator+componentsList) ⇒ <code>Array</code>
      * [.shareResponsibility(mediator)](#global.Mediator+shareResponsibility)
      * [.toString()](#global.Mediator+toString) ⇒ <code>string</code>
    * _static_
      * [.EVENTS](#global.Mediator.EVENTS)
        * [.ADD](#global.Mediator.EVENTS.ADD)
        * [.REMOVE](#global.Mediator.EVENTS.REMOVE)

<a name="global.EventEmitter"></a>
### global.EventEmitter
**Kind**: static class of <code>[global](#global)</code>  

* [.EventEmitter](#global.EventEmitter)
  * [new EventEmitter()](#new_global.EventEmitter_new)
  * [.on(eventName, handler)](#global.EventEmitter+on)
  * [.once(eventName, handler)](#global.EventEmitter+once)
  * [.off(eventName, [handler])](#global.EventEmitter+off)
  * [.emit(eventName, List)](#global.EventEmitter+emit)
  * [.toString()](#global.EventEmitter+toString) ⇒ <code>string</code>

<a name="new_global.EventEmitter_new"></a>
#### new EventEmitter()
EventEmitter - provides event-driven system

<a name="global.EventEmitter+on"></a>
#### eventEmitter.on(eventName, handler)
Method provide ability to subscribe on some event by name and react on it by handler

**Kind**: instance method of <code>[EventEmitter](#global.EventEmitter)</code>  

| Param | Type |
| --- | --- |
| eventName | <code>string</code> | 
| handler | <code>function</code> | 

<a name="global.EventEmitter+once"></a>
#### eventEmitter.once(eventName, handler)
Method allows to subscribe on some event and unsubscribe automatically after event will happen

**Kind**: instance method of <code>[EventEmitter](#global.EventEmitter)</code>  

| Param | Type |
| --- | --- |
| eventName | <code>string</code> | 
| handler | <code>function</code> | 

<a name="global.EventEmitter+off"></a>
#### eventEmitter.off(eventName, [handler])
Method allows to remove subscription for specify handler of all event if handler is not defined

**Kind**: instance method of <code>[EventEmitter](#global.EventEmitter)</code>  

| Param | Type |
| --- | --- |
| eventName | <code>string</code> | 
| [handler] | <code>function</code> | 

<a name="global.EventEmitter+emit"></a>
#### eventEmitter.emit(eventName, List)
Method allows to trigger all handler which are subscribed on some event and also pass any number of arguments

**Kind**: instance method of <code>[EventEmitter](#global.EventEmitter)</code>  

| Param | Type | Description |
| --- | --- | --- |
| eventName | <code>string</code> |  |
| List | <code>arguments</code> | of arguments |

<a name="global.EventEmitter+toString"></a>
#### eventEmitter.toString() ⇒ <code>string</code>
Overriding of standart toString method

**Kind**: instance method of <code>[EventEmitter](#global.EventEmitter)</code>  
**Returns**: <code>string</code> - Returns string '[object EventEmitter]'  
<a name="global.Mediator"></a>
### global.Mediator
**Kind**: static class of <code>[global](#global)</code>  

* [.Mediator](#global.Mediator)
  * [new Mediator(eventEmitter, setting)](#new_global.Mediator_new)
  * _instance_
    * [.addComponent(name, registrator)](#global.Mediator+addComponent)
    * [.removeComponent(name)](#global.Mediator+removeComponent) ⇒ <code>boolean</code>
    * [.hasComponent(name)](#global.Mediator+hasComponent) ⇒ <code>boolean</code>
    * [.getComponent(name)](#global.Mediator+getComponent) ⇒ <code>Object</code>
    * [.componentsList()](#global.Mediator+componentsList) ⇒ <code>Array</code>
    * [.shareResponsibility(mediator)](#global.Mediator+shareResponsibility)
    * [.toString()](#global.Mediator+toString) ⇒ <code>string</code>
  * _static_
    * [.EVENTS](#global.Mediator.EVENTS)
      * [.ADD](#global.Mediator.EVENTS.ADD)
      * [.REMOVE](#global.Mediator.EVENTS.REMOVE)

<a name="new_global.Mediator_new"></a>
#### new Mediator(eventEmitter, setting)
Mediator - Provide ability to you create a simple mediator to control interaction among components based on low coupling


| Param | Type |
| --- | --- |
| eventEmitter | <code>EventEmitter</code> | 
| setting | <code>Object</code> | 

<a name="global.Mediator+addComponent"></a>
#### mediator.addComponent(name, registrator)
Method provides ability to add component

**Kind**: instance method of <code>[Mediator](#global.Mediator)</code>  

| Param | Type |
| --- | --- |
| name | <code>string</code> | 
| registrator | <code>function</code> | 

<a name="global.Mediator+removeComponent"></a>
#### mediator.removeComponent(name) ⇒ <code>boolean</code>
Method removes existing component, unattached event handlers for component and remove dependencies

**Kind**: instance method of <code>[Mediator](#global.Mediator)</code>  
**Returns**: <code>boolean</code> - True if component was removed in opposite false  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Component Name |

<a name="global.Mediator+hasComponent"></a>
#### mediator.hasComponent(name) ⇒ <code>boolean</code>
Method provides you ability to check component existence by name

**Kind**: instance method of <code>[Mediator](#global.Mediator)</code>  

| Param | Type |
| --- | --- |
| name | <code>string</code> | 

<a name="global.Mediator+getComponent"></a>
#### mediator.getComponent(name) ⇒ <code>Object</code>
Method provides component by name

**Kind**: instance method of <code>[Mediator](#global.Mediator)</code>  

| Param | Type |
| --- | --- |
| name | <code>string</code> | 

<a name="global.Mediator+componentsList"></a>
#### mediator.componentsList() ⇒ <code>Array</code>
Method provides components' names list for all registered components

**Kind**: instance method of <code>[Mediator](#global.Mediator)</code>  
**Returns**: <code>Array</code> - Array that contains string names of each registered component  
<a name="global.Mediator+shareResponsibility"></a>
#### mediator.shareResponsibility(mediator)
Method can be used if you want to share events among several mediators in application

**Kind**: instance method of <code>[Mediator](#global.Mediator)</code>  

| Param | Type |
| --- | --- |
| mediator | <code>Mediator</code> | 

<a name="global.Mediator+toString"></a>
#### mediator.toString() ⇒ <code>string</code>
Return string for Instance of Mediator [object Mediator]

**Kind**: instance method of <code>[Mediator](#global.Mediator)</code>  
<a name="global.Mediator.EVENTS"></a>
#### Mediator.EVENTS
**Kind**: static constant of <code>[Mediator](#global.Mediator)</code>  

  * [.EVENTS](#global.Mediator.EVENTS)
    * [.ADD](#global.Mediator.EVENTS.ADD)
    * [.REMOVE](#global.Mediator.EVENTS.REMOVE)

<a name="global.Mediator.EVENTS.ADD"></a>
##### EVENTS.ADD
Event with this name is emitted every time when new component is registered in system

**Kind**: static constant of <code>[EVENTS](#global.Mediator.EVENTS)</code>  
<a name="global.Mediator.EVENTS.REMOVE"></a>
##### EVENTS.REMOVE
Event with this name is emitted every time when component is removed in system

**Kind**: static constant of <code>[EVENTS](#global.Mediator.EVENTS)</code>  
