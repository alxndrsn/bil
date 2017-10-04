#!/usr/bin/env node

const determineSlug = require('../src/determine-slug');
const printBuildStatus = require('../src/print-build-status');
const travis = require('../src/travis');
const usage = require('../src/usage');

const args = process.argv.slice(2);

if(args.includes('--usage')) {
  usage(0);
}

const slug = determineSlug();
travis.getBuildStatus(slug, 'latest')
  .then(status => printBuildStatus(slug, status));
