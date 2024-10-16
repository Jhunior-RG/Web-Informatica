import db from "../config/db.js";
import { DataTypes } from "sequelize";



const Grupo = db.define('Grupo', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    docente: {
        type: DataTypes.STRING,
    }
}, {
    tableName: 'Grupos', timestamps: false
})


export default Grupo;
