# DOC IN PROGRESS
# Pls, look at the tests for examples

<a name="global"></a>
## global : <code>object</code>
**Kind**: global namespace  

* [Mediator](#global.Mediator)
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
