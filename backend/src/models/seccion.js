import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Seccion = db.define(
  "Seccion",
  {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { tableName: "Secciones", timestamps: false }
);

export default Seccion;