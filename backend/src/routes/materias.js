import {Router} from 'express'
import Materia from '../models/materia.js'


const materias = Router()

materias.get('/', async (req,res) => {
    const materias = await Materia.findAll()
    res.status(201).json(materias)
})

materias.post('/', async(req,res)=> {
    try{
        const materia = await Materia.create(req.body)
        res.status(201).json(materia)
    }catch(error){
        res.status(400).json({message: error.message})
    }
})

export default materias