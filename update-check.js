const simpleGit = require('simple-git');
const git = simpleGit();

git.diff((diff) => {
  console.log('dif: ', diff);
})