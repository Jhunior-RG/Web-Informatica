import { DataTypes } from 'sequelize'
import sequelize from '../config/sequelize.js';

const Material = sequelize.define('Material', {
    // Definir los campos del modelo
    url: {
        type: DataTypes.STRING,
        allowNull: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    id_materia: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Materia',
            key: 'id'
        },
        allowNull: false
    }
});


export default Material;
