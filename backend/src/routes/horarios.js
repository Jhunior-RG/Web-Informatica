import { Router } from "express";
import Semestre from '../models/semestre.js'
import Materia from "../models/materia.js";
import Grupo from "../models/grupo.js";

const horarios = Router();

horarios.get('/', async (req, res) => {
      try {
        const semestres = await Semestre.findAll(); 
        res.json(semestres);
      } catch (error) {
        console.error(error); 
        res.status(500).send("Error al obtener los semestres"); 
      }
})

horarios.get("/:id/materias", async (req, res) => {
  const { id } = req.params; 
  try {
    const semestre = await Semestre.findByPk(id);
    if (!semestre) {
      return res.status(404).send("Semestre no encontrado");
    }

    const materias = await Materia.findAll({
      where: { semestre: id },
    });

    res.json(materias); 
  } catch (error) {
    console.error(error); 
    res.status(500).send("Error al obtener las materias"); error
  }
});

horarios.get("/:id/grupos", async (req, res) => {
    const { id } = req.params;
    try {
        const grupos = await Grupo.findAll({
            where: {idMateria: id },
        })
        res.json(grupos)

    } catch (error) {
        console.error(error);
        res.status(500).send("Error al obtener los grupos");
        error;
    }
})

export default horarios;