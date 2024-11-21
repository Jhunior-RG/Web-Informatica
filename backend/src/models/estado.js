import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Estado = db.define(
  "Estado",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true, // Define como clave primaria
      autoIncrement: true, // Se incrementa automáticamente
    },
    estado: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [["Aprobado", "En Curso", "Pendiente"]],
      },
    },
  },
  {
    tableName: "Estados",
    timestamps: false,
  }
);

export default Estado;
