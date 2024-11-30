import { Router } from "express";
import upload from "../middlewares/upload.js";

import {
  crearMaterias,
  obtenerGrupos,
  obtenerGruposDeUnUsuario,
  obtenerMateria,
  obtenerMaterias,
  obtenerSemestres,
} from "../controllers/materiaController.js";

const materias = Router();

materias.get("/:id", obtenerMateria);

materias.get("/", obtenerMaterias);

materias.post("/", upload.single("imagen"), crearMaterias);

materias.get("/:id/grupos", obtenerGrupos);

materias.get("/semestres", obtenerSemestres)

materias.get("/usuario/:id", obtenerGruposDeUnUsuario);

export default materias;
