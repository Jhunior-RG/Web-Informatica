import Usuario from "./usuario.js"
import Materia from "./materia.js"
import Grupo from "./grupo.js"
import Clase from "./clase.js"
import Semestre from "./semestre.js"



export default function setupAssociations() {
    Grupo.belongsToMany(Usuario, { through: 'Usuario_Grupo' })
    Usuario.belongsToMany(Grupo, { through: 'Usuario_Grupo' })
    

    Materia.hasMany(Grupo, { foreignKey: "idMateria" })
    Grupo.belongsTo(Materia, { foreignKey: 'idMateria' })


    Grupo.hasMany(Clase,
        {
            foreignKey: 'idGrupo'
        }
    )

    Materia.belongsTo(Semestre, { foreignKey: 'idSemestre' })
    Semestre.hasMany(Materia, {
        foreignKey: 'idSemestre'
    })
}