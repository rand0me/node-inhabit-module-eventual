//------------------------------------------------------------------------------
// Name: src/ContentValidator.js
// Author: rand0me <mailto:not.randome@gmail.com>
// Timestamp: 2016-09-15T08:56:02.372Z
// Description:
//    Validate some content against base interface requirements
//------------------------------------------------------------------------------

module.exports = {
  validate: validateContent
}

function validateContent(content) {
  ensureType(content, 'object');
  validateType(content.type);
  validateTitle(content.title);
  validateThumbnail(content.thumbnail);
}

function validateType(type) {
  var VALID_TYPES = [ 'video', 'quiz', 'interactive' ];

  ensureType(type, 'string');

  if (VALID_TYPES.indexOf(type) === -1) {
    throw Error('type must be on of ' + VALID_TYPES.join(', '));
  }
};

function validateTitle(title) {
  ensureType(title, 'string');
}

function validateThumbnail(thumbnail) {
  ensureType(thumbnail, 'string');
}

function ensureType(value, type) {
  if (typeof value !== type) {
    throw Error('value must be a valid ' + type);
  }
}
