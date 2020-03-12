'use strict';

const packageJson = require(`../../../package.json`);
const chalk = require(`chalk`);

module.exports = {
  name: `--version`,
  run() {
    const version = packageJson.version;
    console.info(chalk.blue(version));
  }
};
