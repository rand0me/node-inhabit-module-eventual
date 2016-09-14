//------------------------------------------------------------------------------
// Name: test/inheritance.test.js
// Author: rand0me <mailto:dandydan2k@gmail.com>
// Timestamp: 2016-09-14T14:34:31.001Z
// Description:
//    Test that a module extends InhabitModuleBase
//------------------------------------------------------------------------------

global.__ark_app__ = { apps: {} };

var test = require('tape');
var InhabitModuleEventual = require('../src/InhabitModuleEventual');
var InhabitModuleBase = require('inhabit-module-base');

test('inheritance test', function (t) {
  t.plan(1);

  t.ok( InhabitModuleEventual.prototype instanceof InhabitModuleBase );
});
