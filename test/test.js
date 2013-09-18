var test = require('tape');
var bindexOf = require('../');

test("can haz working",function(t){


  var newLineBuffer = new Buffer("\n");

  var b = new Buffer("hi\nho\nsilver");


  t.equals(bindexOf(b,newLineBuffer),2,'should find newlines');

  // you can also start from index

  t.equals(bindexOf(b,newLineBuffer,3),5,"should find newlines after offset");

  // no match === -1

  t.equals(bindexOf(b,newLineBuffer,6),-1,"should not find newlines where none are.");


  t.end();
})
