module.exports = (slug, status) => {
  const build = status.build;
  const jobs = status.jobs || [];

  console.log(
`
${describe(slug, build)}
Repo: https://github.com/${slug}
Build: https://travis.org/${slug}/builds/${build.id}
Status: ${build.state}
Duration: ${duration(build)}
`);

for(job in status.jobs) {
console.log(
`
    Job: TODO ${job}
`);
}


};

const describe = (slug, build) => {
  if(build.pull_request) {
    return `PR: ${build.pull_request_title}
  https://github.com/${slug}/pulls/${build.pull_request_number}`;
  } else if(build.event_type === 'push') {
    return `PUSH: ${build.branch}`; // TODO branch doesn't really exist
  } else {
    throw new Error(`Don't know how to describe build of type: ${build.event_type} ${JSON.stringify(build)}`);
  }
};

const duration = build => build.duration || (Date.now() - Date.parse(build.started_at));
