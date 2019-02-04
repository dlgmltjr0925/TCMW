/* eslint-disable class-methods-use-this */
import * as Queue from '../Queue';

const GLOBAL = 'global';

/*
message: {
  header: 'string',
  body: 'string',
}
*/

export default class Task {
  constructor(name) {
    this.name = name;
    this.queue = Queue.createQueue(Queue.type.local, this.name);
    this.subscribers = []; // worker
  }

  // interface

  getMessage(info) {
    /*
    - input
    info : object, any
    - output
    message: object,
    {
      header: 'string',
      body: 'string',
    }
    */
    // return { header: '', body: '' };
  }

  work(message) {
    /*
    - input
    message: object,
    {
      header: 'string',
      body: 'string',
    }
    - output
    any
    */
  }

  getWork() {
    return this.work;
  }

  // Property

  getName() {
    return this.name;
  }

  // Queue

  setQueue(queue) {
    this.queue = queue;
  }

  getQueue() {
    return this.queue;
  }

  push(message) {
    this.queue.push(message);
  }

  pop() {
    // return type : message;
    return this.queue.pop();
  }

  isEmpty() {
    return this.queue.isEmpty();
  }

  // Pub/Sub

  addSubscriber(subscriber, channel = GLOBAL) {
    this.subscribers.push({
      channel,
      subscriber,
    });
    subscriber.setTask(this);
  }

  publish(message, channel = GLOBAL) {
    this.subscribers.map((subscriber) => {
      if (channel === GLOBAL || subscriber.channel === channel) {
        subscriber.subscriber.subscribe(message);
      }
    });
  }
}
