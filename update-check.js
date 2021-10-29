const simpleGit = require('simple-git');
const git = simpleGit();

const test = async () => {
  try {
    if(!process.argv.slice(-1)) return
    await git.init().addRemote('origin', process.argv.slice(-1));
  } catch(e){};

  const wholeRepoStatus = await git.status();
  if (wholeRepoStatus.ahead || wholeRepoStatus.behind) {
    console.log('Uploading new version');
    await git.stash();
    await git.pull('origin', 'master', {'--rebase': 'true'});
  }
  console.log('Version up to date');
};

test();
