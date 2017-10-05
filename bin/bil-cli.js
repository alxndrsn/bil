#!/usr/bin/env node

const determineSlug = require('../src/determine-slug');
const openBrowser = require('../src/open-browser');
const printBuildStatus = require('../src/print-build-status');
const travis = require('../src/travis');
const usage = require('../src/usage');

const args = process.argv.slice(2);

if(args.includes('--usage')) {
  usage(0);
}

const slug = determineSlug();

if(args[0] === '-b' || args[0] === '--open-build') {
  travis.getBuildStatus(slug, 'latest')
    .then(status => openBrowser(slug, status));
} else if(args[0] === '-j' || args[0] === '--open-job') {
  travis.getBuildStatus(slug, 'latest')
    .then(status => openBrowser(slug, status, args[1]));
} else {
  travis.getBuildStatus(slug, 'latest')
    .then(status => printBuildStatus(slug, status));
}
