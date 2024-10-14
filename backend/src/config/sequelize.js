import {Sequelize} from 'sequelize'

// Conectar a la base de datos
const sequelize = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: "postgres",
        logging: ()=>{}
    }
);

// Probar la conexión
sequelize
    .authenticate()
    .then(() => {
        console.log("Conexión exitosa con la base de datos.");
    })
    .catch((error) => {
        console.error("No se pudo conectar a la base de datos:", error);
    });
sequelize.sync({alter: true})

export default sequelize
