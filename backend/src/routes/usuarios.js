import { Router } from 'express'
import Usuario from '../models/usuario.js'

const router = Router()


router.get('/',(req, res) => {
        res.json({ "hola": "mundo" })
    })
router.post('/',async (req, res) => {
    const {nombre,email,password} = req.body 
    try{
        const usuario = await Usuario.create({nombre,email,password}) 
        res.status(201).json(usuario)
    }catch(error){
        res.status(400).json({ error: error.message });
    }
})

export default router;