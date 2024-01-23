const chalk = require("chalk");

const statusSelector = (statusCode: number) => {
  switch (statusCode) {
    case 200:
      return chalk.green.bold.underline
    case 400:
      return chalk.yellow.bold.underline
    case 500:
      return chalk.red.bold.underline
    default:
      return chalk.blue.bold.underline
  }
}

module.exports = statusSelector;