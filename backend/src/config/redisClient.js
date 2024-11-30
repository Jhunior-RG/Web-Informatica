import redis from 'redis'
const redisClient = redis.createClient({
  host: "localhost",
  port: 6379,
});

async function connectRedis() {
  if (!redisClient.isOpen) {
    await redisClient.connect();
  }
}

connectRedis().catch(console.error);

export default redisClient;
