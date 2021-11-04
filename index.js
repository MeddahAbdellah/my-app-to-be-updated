const fork = require('child_process').fork;
const pjson = require('./package.json');
fork('node',['updater.js', `--pid=${process.pid}`]);

// app code here
setInterval(() => { console.log('app running: ', pjson.version); }, 1000);