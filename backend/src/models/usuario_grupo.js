
import db from "../config/db.js";

const Usuario_Grupo = db.define(
  "Usuario_Grupo",
  {
  },
  { tableName: "Usuario_Grupo", timestamps: false }
);

export default Usuario_Grupo;
