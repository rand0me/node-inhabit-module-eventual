//------------------------------------------------------------------------------
// Name: test/constructor.test.js
// Author: rand0me <mailto:dandydan2k@gmail.com>
// Timestamp: 2016-09-14T14:28:47.981Z
// Description:
//    Test a constructor
//------------------------------------------------------------------------------

global.__ark_app__ = { apps: {} };

var test = require('tape');
var InhabitModuleEventual = require('../src/InhabitModuleEventual');

test('constructor test', function (t) {
  t.plan(1);
  t.equal(typeof InhabitModuleEventual, 'function');
});
