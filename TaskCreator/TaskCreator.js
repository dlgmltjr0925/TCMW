export default class TaskCreator {
  constructor() {
    this.taskManager = null;
  }

  setTaskManager(taskManager) {
    this.taskManager = taskManager;
  }

  setTask(task) {
    this.task = task;
  }

  // interface

  run() {
  }
};
