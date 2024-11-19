import { Router } from "express";
import {
    crearLink,
    crearMaterial,
    crearSeccion,
    eliminarMaterial,
    obtenerSeccionesDeMateria,
} from "../controllers/materialController.js";
import upload from "../middlewares/upload.js";
import authToken from "../middlewares/authToken.js";


const materiales = Router();

materiales.post("/seccion", crearSeccion);
materiales.get("/materia/:id/seccion", obtenerSeccionesDeMateria);
materiales.post("/material",authToken, upload.single("archivo"), crearMaterial);
materiales.post("/link", authToken, crearLink);
materiales.delete("/:id", authToken, eliminarMaterial);

export default materiales;
