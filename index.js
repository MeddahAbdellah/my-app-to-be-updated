const exec = require('child_process').exec;
exec('node updater.js');
// app code here
setInterval(() => { console.log('app running: ', pjson.version); }, 1000);