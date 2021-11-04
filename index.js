const spawn = require('child_process').spawn;
const pjson = require('./package.json');
spawn('node',['updater.js', `--pid=${process.pid}`]);

// app code here
setInterval(() => { console.log('app running: ', pjson.version); }, 1000);