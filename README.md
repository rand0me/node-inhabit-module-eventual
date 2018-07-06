# inhabit-module-eventual

[![Greenkeeper badge](https://badges.greenkeeper.io/rand0me/node-inhabit-module-eventual.svg)](https://greenkeeper.io/)

## For what?
To simplify the structure of module and make it understandable for those who familiar with Eventual Pattern (jquery)

## Installation
    npm install --save-dev inhabit-module-eventual

## Usage
You can use this module as a base class to extend. To extend a "class" in `ES5` manner you can act as follows:
```javascript
var InhabitModuleEventual = require('inhabit-module-eventual');

function MySimpleModule() {
  // Important line, do not ignore or move it, unless you know what you do
  InhabitModuleEventual.apply(this, arguments);

  this.on('load', this.load);
}

// Important lines, do not remove
// Extending InhabitModuleEventual
MySimpleModule.prototype = Object.create(InhabitModuleEventual.prototype);
MySimpleModule.prototype.constructor = MySimpleModule;

MySimpleModule.prototype.load = function () {
  // You must not require jquery and include it in your module
  // Instead Inhabit will provide it to you, injecting it in your module under the hood
  this.$.getJSON('/data.json', function (data) {
    this.emit('content', data);
  }.bind(this));
}

// Important line, do not remove
InhabitModuleEventual.publish(MySimpleModule);
```

If you prefer `CoffeeScript`, this code will look like so:
```coffeescript
InhabitModuleEventual = require "inhabit-module-eventual"

class MyCoffeeModule extends InhabitModuleEventual

  constructor: ->
    super arguments
    @on "load", @load

  load: ->
    @$.getJSON "/data.json", (data) =>
      @emit "content", data
```

## License

Copyright (c) 2016, rand0me <not.randome@gmail.com>

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
