//------------------------------------------------------------------------------
// Name: src/InhabitModuleEventual.js
// Author: rand0me <mailto:dandydan2k@gmail.com>
// Timestamp: 2016-09-14T14:31:56.445Z
// Description:
//    Eventual Inhabit module base class
//------------------------------------------------------------------------------

var InhabitModuleBase = require('inhabit-module-base');
var EventEmitter = require('events').EventEmitter;

function InhabitModuleEventual() {
  InhabitModuleBase.apply(this, arguments);
  this.emitter = new EventEmitter();
}

InhabitModuleEventual.prototype = Object.create(InhabitModuleBase.prototype);
InhabitModuleEventual.prototype.constructor = InhabitModuleEventual;

InhabitModuleEventual.prototype.emit = function (name, subject) {
  this.emitter.emit(name, subject);
}

InhabitModuleEventual.prototype.on = function (name, handler) {
  this.emitter.on(name, handler.bind(this));
}

InhabitModuleEventual.prototype.once = function (name, handler) {
  this.emitter.once(name, handler.bind(this));
}

InhabitModuleEventual.prototype.getContent = function () {
  this.deferred = this.$.Deferred();
  this.on('content', function (content) {
    this.content = content;
    this.deferred.resolve(this);
  });
  this.emit('load');

  return this.deferred.promise();
}

module.exports = InhabitModuleEventual;
