const request = require('request-promise-native');

module.exports = {
  getBuildStatus: getBuildStatus,
  hasBuild: slug => false, // TODO actually check this!
};


function getBuildStatus(slug, build) {
  const options = {
    url: `https://api.travis-ci.org/repos/${slug}/builds`,
    headers: {
      accept: 'application/vnd.travis-ci.2+json',
    },
    json: true,
  };

  return request(options)
    .then(res => res.builds)
    .then(builds => {
      if(build === 'latest') return builds[0];
      else throw new Error(`Don't know how to fetch build ${build}`);
    })
    .then(build => {
      return {
        build: build,
      };
    });
}
