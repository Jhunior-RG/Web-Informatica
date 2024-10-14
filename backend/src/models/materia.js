import { DataTypes } from 'sequelize'
import sequelize from '../config/sequelize.js';

const Materia = sequelize.define('Materia', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    semestre: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    imagen_url: {
        type: DataTypes.STRING,
        allowNull: true
    }
});


export default Materia; 
 