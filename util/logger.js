import chalk from 'chalk';

const logger = (str, type = 0) => {
  switch (type) {
  case 0:
    console.log(chalk.cyan(str)); // eslint-disable-line no-console
    break;
  case 1:
    console.log(chalk.red(str)); // eslint-disable-line no-console
    break;
  }
};

export default logger;