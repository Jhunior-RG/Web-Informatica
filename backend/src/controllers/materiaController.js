import redisClient from "../config/redisClient.js";
import Semestre from "../models/semestre.js";
import Materia from "../models/materia.js";
import Grupo from "../models/grupo.js";
import Usuario from "../models/usuario.js";

export const obtenerMaterias = async (req, res) => {
  const cacheKey = "Materias";
  try {
    redisClient.get(cacheKey, async (err, data) => {
      if (data) {
        return res.status(200).json(data);
      }
    });
    const materias = await Materia.findAll();
    const datos = {
      data: materias,
      message: "se obtuvo todas las materias correctamente",
    };
    datos.data.sort((a, b) => a.id - b.id);
    redisClient.setEx(cacheKey, 3600, JSON.stringify(datos));
    res.status(201).json(datos);
  } catch (e) {
    console.error(e);
    res.status(500).send("Error al obtener las materias");
  }
};

export const crearMaterias = async (req, res) => {
  try {
    const { nombre, idSemestre } = req.body;
    const urlImagen = req.file
      ? `${req.protocol}://${req.get("host")}/image/${req.file.filename}`
      : null;
    const materia = await Materia.create({ nombre, idSemestre, urlImagen });
    res.json(materia);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const obtenerMateria = async (req, res) => {
  const id = req.params.id;
  const cacheKey = `materia:${id}`;
  try {
    redisClient.get(cacheKey, async (err, data) => {
      if (data) {
        return res.status(200).json(data);
      }
    });
    const materia = await Materia.findByPk(id);
    if (materia) {
      res.json(materia);
    } else {
      redisClient.setEx(cacheKey, 3600, JSON.stringify(materia));
      res.status(404).json({ mensaje: "Libro no encontrado" });
    }
  } catch (e) {
    console.error(e);
    res.status(500).send("Error al obtener la materia");
  }
};

export const obtenerGrupos = async (req, res) => {
  const { id } = req.params;
  const cacheKey = `grupos:${id}`;
  try {
    redisClient.get(cacheKey, async (err, data) => {
      if (data) {
        return res.status(200).json(data);
      }
    });
    const materia = await Materia.findByPk(id);
    if (!materia) {
      return res.status(404).send("Semestre no encontrado");
    }

    const grupos = await Grupo.findAll({
      where: { idMateria: id },
    });
    redisClient.setEx(cacheKey, 3600, JSON.stringify(grupos));

    res.status(200).json(grupos);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener los grupos");
    error;
  }
};

export const obtenerSemestres = async (req, res) => {
    const cacheKey = "Semestres"
  try {
    redisClient.get(cacheKey, async (err, data) => {
      if (data) {
        return res.status(200).json(data);
      }
    });

    const semestres = await Semestre.findAll({
      include: { model: Materia },
    });

    if (!semestres) {
      return res.status(404).send("No se encontraron semestres");
    }

    const data = {
      data: semestres,
      message: "se obtuvieron las materias por semestre",
    };
    redisClient.setEx(cacheKey, 3600, JSON.stringify(data));
    res.satatus(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener los semestres");
  }
};

export const obtenerGruposDeUnUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    const usuario = await Usuario.findByPk(id, {
      include: {
        model: Grupo,
        include: [
          {
            model: Materia,
          },
        ],
      },
    });
    res.status(200).json(usuario);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener las materias del usuario");
  }
};