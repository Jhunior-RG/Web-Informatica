import { Router } from "express";
import { obtenerClases } from "../controllers/grupoController.js";

const grupos = Router()

grupos.get('/:id/clases',obtenerClases)

export default grupos;