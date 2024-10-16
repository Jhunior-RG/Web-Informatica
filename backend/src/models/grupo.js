        import db from "../config/db.js";
import Clase from "./clase.js";
import { DataTypes } from "sequelize";
import Materia from "./materia.js";


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
