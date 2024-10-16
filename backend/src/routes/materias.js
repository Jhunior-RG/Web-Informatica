import { Router } from 'express'
import Materia from '../models/materia.js'
import upload from '../middlewares/multer.js'


const materias = Router()

materias.get('/', async (req, res) => {
    const materias = await Materia.findAll()

    res.status(201).json(materias)
})

materias.post('/', upload.single('imagen'), async (req, res) => {
    try {
        const { nombre, semestre } = req.body
        const imagen_url = req.file ? `${req.protocol}://${req.get('host')}/image/${req.file.filename}` : null;
        const materia = await Materia.create({ nombre, semestre, imagen_url })
        res.json(materia)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

export default materias