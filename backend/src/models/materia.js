import { DataTypes } from 'sequelize'
import sequelize from '../config/sequelize.js';

const Materia = sequelize.define('Materia', {
    // Definir los campos del modelo
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    semestre: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
});

await sequelize.sync({alter: true});

export default Materia; 
 