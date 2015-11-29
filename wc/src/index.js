/**
 * Created by keith on 15-11-29.
 */

import * as fs from 'fs';
import {Command} from 'commander';

let program = new Command();

program
  .version('0.0.1')
  .option('-c, --chars', 'print the character counts')
  .option('-w, --words', 'print the word counts', 'marble')
  .option('-l, --lines', 'print the newline counts', 'marble')
  .option('-r', 'recurcive', 'marble')
  .option('-a', 'code comment empty', 'marble')
  .option('-x --startx', 'GUI', 'marble')
  .parse(process.argv);

let rs = fs.createReadStream('../test.md');
let chunks = [];
let size = 0;

rs.on('data', (chunk) => {
  chunks.push(chunk);
  size += chunk.length;
});
rs.on('error', (err) => console.log(err.code));
rs.on('end', () => {
  let buf = Buffer.concat(chunks, size);
  let str = buf.toString();
  let newLine = str.match(/\n/g) ? str.match(/\n/g).length : 0;
  let lineCounts = parseInt(newLine) + 1;

  console.log('Character counts: ' + buf.length);
  console.log('Line counts: ' + lineCounts);
});