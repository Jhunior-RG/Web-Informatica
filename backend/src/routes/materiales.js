import { Router } from "express";
import {
  crearLink,
  crearMaterial,
  crearSeccion,
  obtenerSeccionesDeMateria,
} from "../controllers/materialController.js";
import upload from "../middlewares/upload.js";

const materiales = Router();

materiales.post("/seccion", crearSeccion);
materiales.get("/materia/:id/seccion", obtenerSeccionesDeMateria);
materiales.post("/material", upload.single("archivo"), crearMaterial);
materiales.post("/link", crearLink)


export default materiales;
