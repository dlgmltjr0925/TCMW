const GLOBAL = 'global';

export default class TaskManager {
  constructor() {
    this.task = {};
  }

  addTask(task) {
    this.task[task.getName()] = task;
  }

  getTask(name) {
    return this.task[name];
  }

  getMessage(name, info) {
    return this.task[name].getMessage(info);
  }

  getWork(name) {
    return this.task[name].getWork();
  }

  push(name, message) {
    this.task[name].push(message);
  }

  pop(name) {
    return this.task[name].pop();
  }

  isEmpty(name) {
    return this.task[name].isEmpty();
  }

  addSubscriber(subscriber, channel = GLOBAL) {
    this.task[subscriber.getName()].addSubscriber(subscriber, channel);
  }

  publish(name, message, channel = GLOBAL) {
    this.task[name].publish(message, channel);
  }
}
