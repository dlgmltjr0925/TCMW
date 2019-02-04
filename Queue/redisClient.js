import { createClient } from 'async-redis';
import config from '../config';

const redisClient = createClient(config.connect.redis);

export default redisClient;
