import queue from './Queue';

export default class LocalQueue {
  constructor(name, queueOptions = {}) {
    this.name = name;
    this.queue = queue.createQueue(this.name);
    this.allowDuplication = queueOptions.allowDuplication || false;
  }

  setQueue(queue) {
    this.queue = queue;
  }

  push(message) {
    try {
      const { header, body } = message;
      // 중복을 허용하지 않는 경우
      if (!this.allowDuplication && this.queue.exists(this.name, header)) {
        return false;
      }
      this.queue.set(this.name, header, body);
      this.queue.push(this.name, header);
      return true;
    } catch (error) {
      throw error;
    }
  }

  get(index = 0) {
    try {
      const header = this.queue.index(this.name, index);
      const body = this.queue.get(this.name, header);
      return { header, body };
    } catch (error) {
      throw error;
    }
  }

  poppush() {
    const header = this.queue.pop(this.name);
    this.queue.push(this.name, header);
    return true;
  }

  pop() {
    try {
      const header = this.queue.pop(this.name);
      const body = this.queue.get(this.name, header);
      this.queue.del(this.name, header);
      return { header, body };
    } catch (error) {
      throw error;
    }
  }

  isEmpty() {
    try {
      return this.getSize() === 0;
    } catch (error) {
      throw error;
    }
  }


  getSize() {
    try {
      return this.queue.len(this.name);
    } catch (error) {
      throw error;
    }
  }
}
