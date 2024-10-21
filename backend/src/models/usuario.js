import { DataTypes } from 'sequelize'
import db from '../config/db.js';

const Usuario = db.define('Usuario', {
    // Definir los campos del modelo
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
},
    { tableName: "Usuarios" }
);


export default Usuario;
