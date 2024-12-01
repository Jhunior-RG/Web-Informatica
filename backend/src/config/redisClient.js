import { createClient } from 'redis';

console.log("redis:", process.env.REDIS_HOST, process.env.REDIS_PORT);

const redisClient = createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
});

redisClient.on('error', (err) => {
  console.error('Error al conectar con Redis:', err);
});

async function connectRedis() {
  try {
    // Conectar Redis si no está abierto
    if (!redisClient.isOpen) {
      await redisClient.connect();
      console.log("Conexión a Redis exitosa.");
    }
    
    // Realizar el ping solo después de la conexión exitosa
    const res = await redisClient.ping();
    console.log('Respuesta de Redis PING:', res);
  } catch (err) {
    console.error('Error al hacer PING a Redis:', err);
  }
}

connectRedis().catch(console.error);

export default redisClient;
