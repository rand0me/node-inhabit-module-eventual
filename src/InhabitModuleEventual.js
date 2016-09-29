//------------------------------------------------------------------------------
// Name: src/InhabitModuleEventual.js
// Author: rand0me <mailto:dandydan2k@gmail.com>
// Timestamp: 2016-09-14T14:31:56.445Z
// Description:
//    Eventual Inhabit module base class
//------------------------------------------------------------------------------

var InhabitModuleBase = require('inhabit-module-base');
var EventEmitter = require('events').EventEmitter;
var ContentValidator = require('./ContentValidator');

var TEXT_CLASSIFICATION_METHODS = [ 'Keywords', 'Entities', 'Taxonomy' ];

function InhabitModuleEventual() {
  InhabitModuleBase.apply(this, arguments);
  this.emitter = new EventEmitter();

  this.deferred = this.$.Deferred();

  this.on('load', this.onLoad);
  this.on('content', this.resolveContent);
  this.on('timeout', this.rejectContent);
}

InhabitModuleEventual.prototype = Object.create(InhabitModuleBase.prototype);
InhabitModuleEventual.prototype.constructor = InhabitModuleEventual;

InhabitModuleEventual.prototype.setContent = function (content) {
  this.emit('content', content);
};

InhabitModuleEventual.prototype.resolveContent = function (content) {
  try {
    ContentValidator.validate(content);
    this.content = content;
    this.deferred.resolve(this);
  } catch (error) {
    this.rejectContent(error);
  }
};

InhabitModuleEventual.prototype.rejectContent = function (reason) {
  this.content = false;
  this.deferred.reject(reason);
};

//------------------------------------------------------------------------------
// InhabitModuleBase interface implementation
InhabitModuleEventual.prototype.getContent = function () {
  this.emit('load');
  this.checkClassification();

  return this.deferred.promise();
};

InhabitModuleEventual.prototype.hasContent = function () {
  return !!this.content;
};

InhabitModuleEventual.prototype.getType = function () {
  return this.content.type;
};

InhabitModuleEventual.prototype.getTitle = function () {
  return this.content.title;
};

InhabitModuleEventual.prototype.getThumbnail = function () {
  return this.content.thumbnail
};

InhabitModuleEventual.prototype.display = function ($container) {
  this.render($container);
};
//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
// TextClassificationService helper methods
InhabitModuleEventual.prototype.checkClassification = function () {
  TEXT_CLASSIFICATION_METHODS

  .filter(function (method) {
    return this.hasListeners(method.toLowerCase());
  }.bind(this))

  .forEach(function (method) {
    this.requestClassification(method);
  }.bind(this));
};

InhabitModuleEventual.prototype.requestClassification = function (method, callback) {
  this.textClassificationService.getTextClassification('alchemy', method).then(function (classification) {
    this.emit(method.toLowerCase(), classification);
    callback && callback(classification);
  }.bind(this));
};
//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
// EventEmitter interface decorating
InhabitModuleEventual.prototype.emit = function (name, subject) {
  this.emitter.emit(name, subject);
};

InhabitModuleEventual.prototype.on = function (name, handler) {
  this.emitter.on(name, handler.bind(this));
};

InhabitModuleEventual.prototype.once = function (name, handler) {
  this.emitter.once(name, handler.bind(this));
};

InhabitModuleEventual.prototype.hasListeners = function (eventName) {
  return this.emitter.listenerCount(eventName) > 0;
};
//------------------------------------------------------------------------------

module.exports = InhabitModuleEventual;
