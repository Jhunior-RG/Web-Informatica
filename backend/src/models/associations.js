import Usuario from "./usuario.js"
import Material from "./material.js"
import Materia from "./materia.js"
import Grupo from "./grupo.js"
import Clase from "./clase.js"

Usuario.belongsToMany(Grupo,{through: 'Usuario_Grupo'})
Grupo.belongsToMany(Usuario,{through: 'Usuario_Grupo'})
Materia.hasMany(Material, {
    foreignKey: 'idMateria',
})

Materia.hasMany(Grupo, { foreignKey: "idMateria" })
Grupo.belongsTo(Materia,{ foreignKey: 'idMateria'})


Grupo.hasMany(Clase,
    {
        foreignKey: 'idGrupo'
    }
)

export default function setupAssociations() {
}