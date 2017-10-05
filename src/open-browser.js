const exec = require('child_process').exec;

module.exports = (slug, status, job) => {
  const url = job ?
      `https://travis-ci.org/${slug}/jobs/${status.jobs[job].id}` :
      `https://travis-ci.org/${slug}/builds/${status.build.id}`;
  return new Promise((resolve, reject) => {
    const cmd = `open ${url} || firefox ${url} || chromium ${url} || chrome ${url} || 'Google Chrome' ${url}`;
    exec(cmd, err => err ? reject(err) : resolve());
  });
};
