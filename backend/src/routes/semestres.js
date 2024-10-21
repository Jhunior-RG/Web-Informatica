import { Router } from "express";
import Semestre from "../models/semestre.js";
import Materia from "../models/materia.js";

const semestres = Router()
semestres.get('/', async (req, res) => {
    try {
        const semestres = await Semestre.findAll();
        res.json(semestres);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al obtener los semestres");
    }
})

semestres.get('/:id/materias', async (req, res) => {
    try {
        const { id } = req.params;
        const semestres = await Semestre.findByPk(id);
        if (!semestres) {
            return res.status(404).send("Semestre no encontrado");
        }
        const materias = await Materia.findAll({ where: { idSemestre: id } })
        res.json(materias);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al obtener los semestres");
    }
})


export default semestres;