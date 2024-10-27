import { Router } from 'express'
import Materia from '../models/materia.js'
import upload from '../middlewares/multer.js'
import Semestre from '../models/semestre.js'
import Grupo from '../models/grupo.js'
import Usuario from '../models/usuario.js'

const materias = Router()

materias.get('/', async (req, res) => {
    const materias = await Materia.findAll()

    res.status(201).json(materias)
})

materias.post('/', upload.single('imagen'), async (req, res) => {
    try {
        const { nombre, idSemestre } = req.body
        const urlImagen = req.file ? `${req.protocol}://${req.get('host')}/image/${req.file.filename}` : null;
        const materia = await Materia.create({ nombre, idSemestre, urlImagen })
        res.json(materia)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

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
        const usuario = await Usuario.findByPk(id,{
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