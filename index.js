const exec = require('child_process').exec;
const pjson = require('./package.json');
exec(`node updater.js --pid=${process.pid}`);
// app code here
setInterval(() => { console.log('app running: ', pjson.version); }, 1000);