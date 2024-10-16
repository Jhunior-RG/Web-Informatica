import { DataTypes } from 'sequelize'
import db from '../config/db.js';

const Materia = db.define('Materia', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    urlImagen: {
        type: DataTypes.STRING,
        allowNull: true
    },
    esElectiva: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
}, { tableName: "Materias", timestamps: false });


export default Materia;
