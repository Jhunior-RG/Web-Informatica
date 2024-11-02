
import { Router } from "express";
import authToken from "../middlewares/authToken.js";
import { iniciarSession, obtenerPerfil, registrarUsuario } from "../controllers/authController.js";

const auth = Router()

auth.post('/register', registrarUsuario)

auth.post('/login', iniciarSession)

auth.get('/perfil', authToken, obtenerPerfil )
export default auth;