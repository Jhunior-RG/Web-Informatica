import db from "../config/db.js";
import Clase from "./clase.js";

const Grupo = db.define('Grupo', {
    nombre: {
        type: db.Sequelize.STRING,
        allowNull: false,
    },
},{
    modelName: "Grupos"
})

Grupo.hasMany(Clase,
    {
        foreignKey: 'idGrupo'
    }
)

export default Grupo;
