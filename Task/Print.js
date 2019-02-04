/* eslint-disable class-methods-use-this */
import Task from './Task';
import chalk from 'chalk';

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
};

export default class Print extends Task {
  constructor(name = 'print') {
    super(name);
    this.sequence = 0;
  }

  getMessage(info) {
    // info: {
    //   name: 'string',
    //   content: 'string',
    // }
    try {
      this.sequence += 1;
      return {
        header: `print${this.sequence}`,
        body: JSON.stringify(info),
      };
    } catch (error) {
      throw error;
    }
  }

  async work(message, callback) {
    try {
      if (message.header === undefined || message.body === undefined) return;
      const { header, body } = message;
      const sequence = parseInt(header.replace(/print/, ''));
      const { name, content } = JSON.parse(body);
      const ment = `[${sequence}] name: ${name}, content: ${content}`;
      switch (sequence % 3) {
        case 0:
          console.log(chalk.blue(ment));
          break;
        case 1:
          console.log(chalk.green(ment));
          break;
        case 2:
          console.log(chalk.yellow(ment));
          break;
        default:
          break;
      }
      await sleep(Math.floor(Math.random() * 10000));
      callback();
    } catch (error) {
      throw error;
    }
  }
}
