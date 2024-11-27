import { Router } from "express";
import Semestre from "../models/semestre.js";
import Materia from "../models/materia.js";
import Estado from "../models/estado.js";
import Usuario from "../models/usuario.js";
import authToken from "../middlewares/authToken.js";

const pensum = Router();
pensum.get("/", authToken, async (req, res) => {
  const { id } = req.usuario;
  console.log(id);
  try {
    const semestres = await Semestre.findAll({
      attributes: ["nombre"],
      include: [
        {
          model: Materia,
          attributes: ["id", "nombre", "esElectiva"],
          include: [
            {
              model: Estado,
              where: { idUsuario: id },
              attributes: ["id", "estado"],
              required: false,
            },
          ],
          order: [["id", "ASC"]], // Este orden solo afecta a las Materias dentro de cada Semestre
        },
      ],
      order: [["id", "ASC"]], // Orden de los semestres
    });
    res.json(semestres);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los semestres" });
  }
});

pensum.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const estados = await Usuario.findByPk(id, {
      include: [
        {
          model: Estado,
        },
      ],
    });
    res.json(estados);
  } catch (e) {
    console.error(e);
  }
});

pensum.post("/estado", authToken, async (req, res) => {
  const idUsuario = req.usuario.id;
  if (!idUsuario) {
    return res.status(400).json({ message: "Usuario no Valido" });
  }
  console.log(req.body)
  const { idMateria, estado } = req.body;

  if (!idMateria || !estado) {
    return res.status(400).json({ message: "Faltan parámetros requeridos" });
  }

  try {
    const newEstado = await Estado.create({
      estado,
      idUsuario,
      idMateria,
    });
    res.status(201).json(newEstado);
  } catch (error) {
    res.status(500).json({
      messaje: "no se pudo crear el estado",
      error: error.messaje,
    });
  }
});

pensum.patch("/estado", async (req, res) => {
  const { id, estado } = req.body;

  if (!id || !estado) {
    return res.status(400).json({ message: "Faltan parámetros requeridos" });
  }
  try {
    const modEstado = await Estado.findOne({ where: { id } });
    modEstado.estado = estado;
    await modEstado.save();
  } catch (error) {
    res.status(500).json({
      messaje: "no se pudo modificar el estado",
      error: error.messaje,
    });
  }

  res.status(200).json({ message: "Estado modificado exitosamente!" });
});

export default pensum;
