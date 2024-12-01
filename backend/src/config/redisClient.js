import { createClient } from 'redis'
console.log("redis:",process.env.REDIS_HOST,process.env.REDIS_PORT)
const redisClient = createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
});

redisClient.on('error', (err) => {
  console.error('Error al conectar con Redis:', err);
});

async function connectRedis() {
  if (!redisClient.isOpen) {
    await redisClient.connect();
    console.log("Conexión a Redis exitosa.");
  }
}

redisClient.ping()
  .then((res) => console.log('Respuesta de Redis PING:', res))
  .catch((err) => console.error('Error al hacer PING a Redis:', err));

connectRedis().catch(console.error);

export default redisClient;
