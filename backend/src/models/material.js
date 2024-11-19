import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Material = db.define(
  "Material",
  {
    url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: true
    },
    licencia: {
      type: DataTypes.STRING,
      allowNull: true
    },
    descripcionLicencia: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  },
  {
    tableName: "Materiales", timestamps: false
  }
);

export default Material;
