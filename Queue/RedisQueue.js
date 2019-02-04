import redisClient from './redisClient';

export default class RedisQueue {
  constructor(name, queueOptions = {}) {
    this.name = name;
    this.client = redisClient;
    this.allowDuplication = queueOptions.allowDuplication || false;
    this.timeOut = queueOptions.timeOut || 1;
  }

  setRedisClient(client) {
    this.client = client;
  }

  async push(message) {
    try {
      const { header, body } = message;
      // 중복을 허용하지 않는 경우
      if (!this.allowDuplication && await this.client.hexists(this.name, header)) {
        return false;
      }
      this.client.hset(this.name, header, body);
      this.client.lpush(`${this.name}.queue`, header);
      return true;
    } catch (error) {
      throw error;
    }
  }

  async get(index = 0) {
    try {
      const header = await this.client.lindex(`${this.name}.queue`, index);
      const body = await this.client.hget(this.name, header);
      return { header, body };
    } catch (error) {
      throw error;
    }
  }

  async poppush() {
    try {
      const header = await this.client.brpop(`${this.name}.queue`, this.timeOut);
      await this.client.lpush(`${this.name}.queue`, header[1]);
      return true;
    } catch (error) {
      throw error;
    }
  }

  async pop() {
    try {
      const header = await this.client.brpop(`${this.name}.queue`, this.timeOut);
      if (header === null) return null;
      const body = await this.client.hget(this.name, header[1]);
      await this.client.hdel(this.name, header);
      return { header: header[1], body };
    } catch (error) {
      throw error;
    }
  }

  async isEmpty() {
    try {
      return await this.getSize() === 0;
    } catch (error) {
      throw error;
    }
  }

  async getSize() {
    try {
      return this.client.llen(this.name);
    } catch (error) {
      throw error;
    }
  }
}
