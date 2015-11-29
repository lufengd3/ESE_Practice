/**
 * Created by keith on 15-11-29.
 */

'use strict';

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _fs = require('fs');

var fs = _interopRequireWildcard(_fs);

var _commander = require('commander');

var program = new _commander.Command();

program.version('0.0.1').option('-c, --chars', 'print the character counts').option('-w, --words', 'print the word counts', 'marble').option('-l, --lines', 'print the newline counts', 'marble').option('-r', 'recurcive', 'marble').option('-a', 'code comment empty', 'marble').option('-x --startx', 'GUI', 'marble').parse(process.argv);

var rs = fs.createReadStream('../test.md');
var chunks = [];
var size = 0;

rs.on('data', function (chunk) {
  chunks.push(chunk);
  size += chunk.length;
});
rs.on('error', function (err) {
  return console.log(err.code);
});
rs.on('end', function () {
  var buf = Buffer.concat(chunks, size);
  var str = buf.toString();
  var newLine = str.match(/\n/g) ? str.match(/\n/g).length : 0;
  var lineCounts = parseInt(newLine) + 1;

  console.log('Character counts: ' + buf.length);
  console.log('Line counts: ' + lineCounts);
});