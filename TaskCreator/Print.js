/* eslint-disable no-useless-constructor */
import TaskCreator from './TaskCreator';

export default class Print extends TaskCreator {
  run() {
    for (let i = 0; i < 1000; i++) {
      const info = {
        name: `test${i}`,
        content: `hello world${i}`,
      };
      const message = this.taskManager.getMessage('print', info);
      // console.log(message);
      this.taskManager.push('print', message);
      this.taskManager.publish('print', message);
    }
  }
}
