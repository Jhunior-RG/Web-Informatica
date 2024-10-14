import { DataTypes } from 'sequelize'
import sequelize from '../config/sequelize.js';

const Usuario = sequelize.define('Usuario', {
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
    }
});


export default Usuario;
