import {Router} from 'express'
import { nuevoMaterial } from '../controllers/materialController.js'

const materiales = Router()

materiales.post('/:id', nuevoMaterial)

export default materiales