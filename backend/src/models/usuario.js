import { DataTypes } from 'sequelize'
import db from '../config/db.js';
import Grupo from './grupo.js';

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
Usuario.belongsToMany(Grupo,{through: 'Usuario_Grupo'})
Grupo.belongsToMany(Usuario,{through: 'Usuario_Grupo'})

export default Usuario;
