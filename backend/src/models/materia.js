import { DataTypes } from 'sequelize'
import db from '../config/db.js';
import Grupo from './grupo.js'


const Materia = db.define('Materia', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    semestre: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    urlImagen: {
        type: DataTypes.STRING,
        allowNull: true
    },
    esElectiva: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
}, { tableName: "Materias" });

export default Materia;
