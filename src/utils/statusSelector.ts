import chalk, { type Chalk } from 'chalk';

const statusSelector = (statusCode: number): Chalk => {
  switch (statusCode) {
    case 200:
      return chalk.green.bold.underline;
    case 400:
      return chalk.yellow.bold.underline;
    case 500:
      return chalk.red.bold.underline;
    default:
      return chalk.blue.bold.underline;
  }
};

export default statusSelector;
