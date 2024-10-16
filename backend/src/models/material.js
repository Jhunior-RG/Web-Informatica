import { DataTypes } from 'sequelize'
import db from '../config/db.js';
import Materia from './materia.js';

const Material = db.define('Material', {

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
},
    {
        tableName: "Materiales"
    }
);




export default Material;
