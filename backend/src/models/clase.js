import { DataTypes } from "sequelize";
import db from "../config/db.js";


const Clase = db.define('Clase', {
    dia: {
        type: DataTypes.STRING
    },
    lugar: {
        type: DataTypes.STRING
    },
    horaInicio: {
        type: DataTypes.TIME
    },
    horaFin: {
        type: DataTypes.TIME
    }
},
    { modelName: "Clases" }
)


export default Clase;