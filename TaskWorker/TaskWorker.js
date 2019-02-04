export default class TaskWorker {
  constructor(name, count = 1) {
    this.name = name;
    this.count = count;
    this.working = false;
    this.workers = {};
  }

  getName() {
    return this.name;
  }

  setCount(count) {
    this.count = count;
  }

  setTaskManager(manager) {
    this.manager = manager;
    this.setTask(this.manager.getTask(this.name));
  }

  setTask(task) {
    this.task = task;
    this.work = task.getWork();
  }

  subscribe(message) {
    if (this.working) return;
    this.run();
  }

  run() {
    if (this.working) return;
    this.working = true;
    while (!this.task.isEmpty()) {
      if (Object.keys(this.workers).length >= this.count) break;
      for (let i = 0; i < this.count; i++) {
        if (this.workers[i] === undefined) {
          const message = this.task.pop();
          this.workers[i] = this.work;
          this.workers[i](message, () => {
            delete this.workers[i];
            this.task.publish(message);
          });
          break;
        }
      }
    }
    this.working = false;
  }
}
