const simpleGit = require('simple-git');
const git = simpleGit();
const { exec } = require('pkg');
const launchApp = require('child_process').exec;
var pjson = require('./package.json');

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
    await launchApp('./app');
    return;
  }
  console.log('Version up to date');
};

checkUpdate();

console.log("App version: ", pjson.version);

setInterval(() => {}, 10000);
