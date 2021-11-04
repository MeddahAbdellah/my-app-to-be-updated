const spawn = require('child_process').spawn;
const pjson = require('./package.json');
const child = spawn('node',['updater.js', `--pid=${process.pid}`]);
child.stdout.on('data', (data) => {
    console.log(`stdout ${data}`);
  });
// app code here
setInterval(() => { console.log('app running: ', pjson.version); }, 1000);