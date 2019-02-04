import RedisQueue from './RedisQueue';
import LocalQueue from './LocalQueue';

const REDIS = 'redis';
const LOCAL = 'local';
const type = {
  redis: REDIS,
  local: LOCAL,
};

const createQueue = (type, name, options = {}) => {
  if (typeof name !== 'string') {
    return new Error('Invalid type of name. please check your [name] type');
  }
  const queueOptions = options.queueOptions || {};
  switch (type) {
    case REDIS:
      return new RedisQueue(name, queueOptions);
    case LOCAL:
      return new LocalQueue(name, queueOptions);
    default:
      return new Error('Invalid type of queue. please check your [options.type] value');
  }
};

module.exports = {
  type,
  createQueue,
};
