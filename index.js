const spawn = require('child_process').spawn;
const pjson = require('./package.json');
spawn('node',['updater.js', `--pid=${process.pid}`]);

// app code here
var express = require('express');
var app = express();

app.get('/', function (req, res) {
   res.send(`app running: ${pjson.version}`);
})

app.listen(8081);