const simpleGit = require('simple-git');
const git = simpleGit();
const { exec } = require('pkg');
const launchApp = require('child_process').spawn;
var pjson = require('./package.json');


(async function main() {
    if (process.env.process_restarting) {
      delete process.env.process_restarting;
      // Give old process one second to shut down before continuing ...
      setTimeout(main, 1000);
      return;
    }
    console.log("App version: ", pjson.version);
  
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
        console.log('Uploading new version');
        await git.stash();
        await git.pull('origin', 'master', {'--rebase': 'true'});
        await exec(['index.js', '--target', 'host', '--output', 'app']);
        launchApp(process.argv[0], process.argv.slice(1), {
            env: { process_restarting: 1 },
            stdio: 'ignore'
          }).unref();
        return;
      }
      // app code here
      setInterval(() => {}, 10000);
  })();

