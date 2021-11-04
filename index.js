const simpleGit = require('simple-git');
const git = simpleGit();
const { exec } = require('pkg');
const launchApp = require('child_process').exec;
var pjson = require('./package.json');

console.log("App version: ", pjson.version);

const checkUpdate = async () => {
  try {
    if(!process.argv.slice(-1)[0]) return
    await git.init().addRemote('origin', process.argv.slice(-1)[0]);
  } catch(e){
    console.log('Couldnt set origin: ', e);
  };
  await git.fetch();
  const wholeRepoStatus = await git.status();
  if (wholeRepoStatus.ahead || wholeRepoStatus.behind) {
    console.log('Uploading new version');
    await git.stash();
    await git.pull('origin', 'master', {'--rebase': 'true'});
    await exec(['index.js', '--target', 'host', '--output', 'app']);
    process.on('exit', function (){
        await launchApp('./app');
    });
    process.exit();
    
    return;
  }
  console.log("App version: ", pjson.version);
};

checkUpdate();

setInterval(() => {}, 10000);
