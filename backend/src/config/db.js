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


export default db
