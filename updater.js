const simpleGit = require('simple-git');
const git = simpleGit();
const { exec } = require('pkg');
const spawnCommand = require('child_process').spawn;
const execCommand = require('child_process').exec;
const argv = key => {
  // Return true if the key exists and a value is defined
  if ( process.argv.includes( `--${ key }` ) ) return true;

  const value = process.argv.find( element => element.startsWith( `--${ key }=` ) );

  // Return null if the key does not exist and a value is not defined
  if ( !value ) return null;
  
  return value.replace( `--${ key }=` , '' );
}

(async function main() {
  try {
      
      if(argv('origin')){
        await git.init().addRemote('origin', process.argv.slice(-1)[0]);
      }
    } catch(e){
      console.log('Couldnt set origin: ', e);
    };
  await git.fetch();
  const wholeRepoStatus = await git.status();
  if (wholeRepoStatus.ahead || wholeRepoStatus.behind) {
    execCommand(`kill -9 ${argv('pid')}`);
    console.log('Uploading new version');
    await git.stash();
    await git.pull('origin', 'master', {'--rebase': 'true'});
    await exec(['index.js', '--target', 'host', '--output', 'app']);
    spawnCommand('./app');
    return;
  }
})();