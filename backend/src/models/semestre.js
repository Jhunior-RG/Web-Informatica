import { DataTypes } from "sequelize";
import db from "../config/db.js";
const Semestre = db.define("Semestre", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  }

}, {
  tableName: 'Semestres',
  timestamps: false
});

export default Semestre;