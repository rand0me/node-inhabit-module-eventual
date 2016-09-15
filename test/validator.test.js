//------------------------------------------------------------------------------
// Name: test/validator.test.js
// Author: rand0me <mailto:not.randome@gmail.com>
// Timestamp: 2016-09-15T09:17:29.760Z
// Description:
//    @description
//------------------------------------------------------------------------------

var test = require('tape');
var ContentValidator = require('../src/ContentValidator');

var CONTENT_VALID = { type: 'interactive', title: 'Valid Title', thumbnail: 'http://some.url/' },
    CONTENT_UNDEFINED = undefined,
    CONTENT_TYPE_INVALID = { type: 'blabla', title: 'Valid Title', thumbnail: 'http://some.url/' },
    CONTENT_TITLE_INVALID = { type: 'interactive', thumbnail: 'http://some.url/' },
    CONTENT_THUMBNAIL_INVALID = { type: 'interactive', title: 'Valid Title', thumbnail: false };

test('validator test', function (t) {
  t.throws(ContentValidator.validate.bind(null, CONTENT_UNDEFINED), /object/);
  t.throws(ContentValidator.validate.bind(null, CONTENT_TYPE_INVALID), /video, quiz, interactive/);
  t.throws(ContentValidator.validate.bind(null, CONTENT_TITLE_INVALID), /string/);
  t.throws(ContentValidator.validate.bind(null, CONTENT_THUMBNAIL_INVALID), /string/);

  t.doesNotThrow(ContentValidator.validate.bind(null, CONTENT_VALID), /Error/);

  t.end();
});
