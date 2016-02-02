import path from 'path';
import fs from 'fs-extra';
/**
 * Copies static files such as robots.txt, favicon.ico to the
 * output (build) folder.
 */

try {
  fs.copySync('./src/client/public', './dist/public');
  console.log('done');
} catch (err) {
  console.error('Oh no, there was an error: ' + err.message);
}
