const simpleGit = require('simple-git');
const git = simpleGit();

const test = async () => {
  try {
    await git.init().addRemote('origin', '...remote.git');
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
