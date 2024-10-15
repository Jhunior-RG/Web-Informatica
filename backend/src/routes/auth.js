/* eslint-disable no-undef */
import { Router } from "express";
import Usuario from "../models/usuario.js";
import jwt from 'jsonwebtoken'
import authToken from "../middlewares/authToken.js";

const auth = Router()

const JWT_SECRET = process.env.JWT_SECRET

auth.post('/register', async (req, res) => {
    try {
        await Usuario.create(req.body)
        res.status(201).json({ message: 'Usuario creado Correctamente' })
    } catch (e) {
        if (e.parent.code === "23505") {
            res.status(
                400
            ).json({ message: 'el correo ya se encuentra registrado' })
        } else {
            res.status(400).json({ message: e.message })
        }
    }
})

auth.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        const usuario = await Usuario.findOne({ email })
        if (!usuario) {
            res.status(404).json({ message: 'Usuario no encontrado' })
            return
        }
        if (usuario.password !== password) {
            res.status(401).json({ message: 'Invalid email or password' })
            return
        }

        const token = jwt.sign({ id: usuario.id }, JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: "Inicio de sesion exitoso", token })
    } catch (e) {
        res.status(400).json({ message: e.message })
    }
})

auth.get('/perfil', authToken, async (req, res) => {
    const { id } = req.usuario;
    const usuario = await Usuario.findByPk(id)

    res.json(usuario)
})
export default auth;