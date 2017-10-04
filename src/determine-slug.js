const execSync = require('child_process').execSync;
const fs = require('fs');
const path = require('path');
const travis = require('./travis');

module.exports = () => {
  // 1. check local git origin
  try {
    const slug = execSync('git remote -v | grep "origin.*fetch"').toString().trim().split('\t')[1].split(' ')[0].split(':')[1].replace(/\.git$/, '');
    if(travis.hasBuild(slug)) return slug;
  } catch(e) {
    //console.log('Failed to get slug from git origin', e);
  }

  // TODO 2. check local package.json
  try {
    return JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf8')).repository.url.split('/').slice(-2).join('/').replace(/.git$/, '');
  } catch(e) {
    //console.log('Failed to get slug from package.json', e);
  }

  // TODO for now, just return pouch so we can get something working
  return 'pouchdb/pouchdb';
};
