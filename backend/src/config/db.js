/* eslint-disable no-undef */
import { Sequelize } from 'sequelize'

// Conectar a la base de datos
const db = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: "postgres",
        logging: () => { }
    }
);

// Probar la conexión
db
    .authenticate()
    .then(() => {
        console.log("Conexión exitosa con la base de datos.");
    })
    .catch((error) => {
        console.error("No se pudo conectar a la base de datos:", error);
    });

    
db.sync({ alter: true })

export default db
