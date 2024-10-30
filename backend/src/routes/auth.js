/* eslint-disable no-undef */
import { Router } from "express";
import authToken from "../middlewares/authToken.js";
import { iniciarSession, registrarUsuario } from "../controllers/authController.js";

const auth = Router()

auth.post('/register', registrarUsuario)

auth.post('/login', )

auth.get('/perfil', authToken, iniciarSession)
export default auth;