import { Router } from 'express'
import Materia from '../models/materia.js'
import upload from '../middlewares/multer.js'
import Semestre from '../models/semestre.js'
import Grupo from '../models/grupo.js'
import Usuario from '../models/usuario.js'
import { crearMaterias, obtenerMaterias } from '../controllers/materiaController.js'

const materias = Router()

materias.get('/', obtenerMaterias)

materias.post('/', upload.single('imagen'), crearMaterias)

materias.get("/:id/grupos", async (req, res) => {
    const { id } = req.params;
    try {

        const materia = await Materia.findByPk(id);
        if (!materia) {
            return res.status(404).send("Semestre no encontrado");
        }

        const grupos = await Grupo.findAll({
            where: { idMateria: id },
        });

        res.status(200).json(grupos);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al obtener los grupos"); error
    }
});
materias.get('/semestres', async (req, res) => {
    try {

        const semestres = await Semestre.findAll({
            include: { model: Materia }
        })

        if (!semestres) {
            return res.status(404).send('No se encontraron semestres')
        }

        res.json({ 'data': semestres, 'message': 'se obtuvieron las materias por semestre' })
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los semestres');
    }
})

materias.get('/usuario/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const usuario = await Usuario.findByPk(id, {
            include: {
                model: Grupo,
                include: [
                    {
                        model: Materia
                    }
                ]
            }
        })
        res.status(200).json(usuario);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener las materias del usuario');
    }
})

export default materias