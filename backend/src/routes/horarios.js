import { Router } from "express";
import authToken from "../middlewares/authToken.js";
import { agregarGrupo, eliminarGrupo, obtenerGrupos, obtenerHorario } from "../controllers/horarioController.js";

const horarios = Router();


horarios.get('/', authToken, obtenerHorario)

horarios.get("/:id/grupos", obtenerGrupos)

horarios.post('/grupos', authToken, agregarGrupo)


horarios.delete('/grupos/:idGrupo', authToken, eliminarGrupo)


export default horarios;