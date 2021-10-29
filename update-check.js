const simpleGit = require('simple-git');
const git = simpleGit();

const test = async () => {
  const wholeRepoStatus = await git.status();
  console.log("wholeRepoStatus", wholeRepoStatus)
  if (wholeRepoStatus.ahead || wholeRepoStatus.behind) {
    await git.stash()
    await git.pull('origin', 'master', {'--rebase': 'true'})
  }
};

test();
