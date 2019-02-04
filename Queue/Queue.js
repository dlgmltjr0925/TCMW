export class Queue {
  constructor() {
    this.data = {};
  }

  createQueue(key) {
    if (this.data[key] === undefined) {
      const queue = {
        queue: [],
      };
      this.data[key] = queue;
    }
    return this;
  }

  set(key, field, value) {
    if (field === 'queue') {
      return new Error('The value of field can not be "queue"');
    }
    if (this.data[key] === undefined) {
      this.data[key] = {
        queue: [],
      };
    }
    this.data[key][field] = value;
    return true;
  }

  get(key, field) {
    if (field === 'queue') {
      return new Error('The value of field can not be "queue"');
    }
    if (this.data[key] === undefined) {
      return new Error('Undefined key. please check your [key] value');
    }
    if (this.data[key][field] === undefined) {
      return new Error('Undefined filed. please check your [filed] value');
    }
    return this.data[key][field];
  }

  exists(key, field) {
    if (field === 'queue') {
      return new Error('The value of field can not be "queue"');
    }
    if (this.data[key] === undefined) {
      return new Error('Undefined key. please check your [key] value');
    }
    return this.data[key][field] !== undefined;
  }

  del(key, field) {
    if (field === 'queue') {
      return new Error('The value of field can not be "queue"');
    }
    if (this.data[key] === undefined) {
      return new Error('Undefined key. please check your [key] value');
    }
    return delete this.data[key][field];
  }

  push(key, value) {
    if (this.data[key] === undefined) {
      this.data[key] = {
        queue: [],
      };
    }
    this.data[key].queue.push(value);
  }

  pop(key) {
    if (this.data[key] === undefined) {
      return new Error('Undefined key. please check your [key] value');
    }
    return this.data[key].queue.shift();
  }

  len(key) {
    if (this.data[key] === undefined) return 0;
    return this.data[key].queue.length;
  }

  index(key, index = 0) {
    if (this.data[key] === undefined) {
      return new Error('Undefined key. please check your [key] value');
    }
    if (index < 0 || index >= this.data[key].queue.length) {
      return new Error('Out of range. please check your [index] value');
    }
    if (this.data[key].queue[index] === undefined) {
      return new Error('Index must be a number. please check your [index] type');
    }
    return this.data[key].queue[index];
  }
}

const queue = new Queue();
export default queue;
