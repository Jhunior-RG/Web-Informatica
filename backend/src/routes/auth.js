import { Router } from "express";
import Usuario from "../models/usuario.js";

const auth = Router()

auth.post('/register', async (req, res) => {
    try {
        console.log(req.body)
        const usuario = await Usuario.create(req.body)
        res.status(201).json(usuario)
    } catch (e) {
        res.status(400).json({ message: e.message })
    }
})

auth.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        const usuario = await Usuario.findOne({ email })
        if(usuario && usuario.password === password) {
            res.status(200).json(usuario)
        }else{
            res.status(401).json({ message: 'Invalid email or password' })
        }
    }catch (e) {
        res.status(400).json({ message: e.message })
    }

})


export default auth;