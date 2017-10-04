module.exports = exitCode => {
  console.log(`
${bold('NAME')}
	bil - CLI client for Travis CI
`);

  process.exit(exitCode);
};

const bold = text => `\x1b[1m${text}\x1b[0m`;
