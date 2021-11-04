const simpleGit = require('simple-git');
const git = simpleGit();
const { exec } = require('pkg');
const execCommand = require('child_process').exec;

(async function main() {
  try {
      if(!process.argv) return;
      if(!process.argv.slice(-1)[0]) return;
      await git.init().addRemote('origin', process.argv.slice(-1)[0]);
    } catch(e){
      console.log('Couldnt set origin: ', e);
    };
  await git.fetch();
  const wholeRepoStatus = await git.status();
  if (wholeRepoStatus.ahead || wholeRepoStatus.behind) {
    execCommand('pm2 kill');
    console.log('Uploading new version');
    await git.stash();
    await git.pull('origin', 'master', {'--rebase': 'true'});
    await exec(['index.js', '--target', 'host', '--output', 'app']);
    execCommand('pm2 start ./app');
    return;
  }
})();