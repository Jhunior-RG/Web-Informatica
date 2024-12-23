import Usuario from "./usuario.js";
import Materia from "./materia.js";
import Grupo from "./grupo.js";
import Clase from "./clase.js";
import Semestre from "./semestre.js";
import Usuario_Grupo from "./usuario_grupo.js";
import Seccion from "./seccion.js";
import Material from "./material.js";
import Estado from "./estado.js";

export default function setupAssociations() {
  Grupo.belongsToMany(Usuario, { through: Usuario_Grupo });
  Usuario.belongsToMany(Grupo, { through: Usuario_Grupo });

  Estado.belongsTo(Materia, { foreignKey: "idMateria" });
  Materia.hasMany(Estado, {foreignKey: "idMateria"})

  Estado.belongsTo(Usuario, { foreignKey: "idUsuario" });
  Usuario.hasMany(Estado,{foreignKey: "idUsuario"})

  Materia.hasMany(Grupo, { foreignKey: "idMateria" });
  Grupo.belongsTo(Materia, { foreignKey: "idMateria" });

  Grupo.hasMany(Clase, {
    foreignKey: "idGrupo",
  });
  Clase.belongsTo(Grupo, { foreignKey: "idGrupo" });

  Semestre.hasMany(Materia, {
    foreignKey: "idSemestre",
  });
  Materia.belongsTo(Semestre, { foreignKey: "idSemestre" });
  Materia.hasMany(Seccion, {
    foreignKey: "idMateria",
  });
  Seccion.belongsTo(Materia, {
    foreignKey: "idMateria",
  });

  Seccion.hasMany(Material, {
    foreignKey: "idSeccion",
  });
  Material.belongsTo(Seccion, {
    foreignKey: "idSeccion",
  });
  Usuario.hasMany(Material, {
    foreignKey: "idUsuario",
  });
  Material.belongsTo(Usuario, {
    foreignKey: "idUsuario",
  });
}
