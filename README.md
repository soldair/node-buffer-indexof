buffer-indexof
===================

find the index of a buffer in a buffer. should behave like String.indexOf etc.

```js

var bindexOf = require('buffer-indexof');

var newLineBuffer = new Buffer("\n");

var b = new Buffer("hi\nho\nsilver");


bindexOf(b,newLineBuffer) === 2

// you can also start from index

bindexOf(b,newLineBuffer,2) === 5

// no match === -1

bindexOf(b,newLineBuffer,5) === -1


```
