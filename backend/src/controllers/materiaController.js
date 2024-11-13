import Materia from "../models/materia.js";

export const obtenerMaterias = async (req, res) => {
    try{
        const materias = await Materia.findAll()
        res.status(201).json({ data: materias, message: "se obtuvo todas las materias correctamente" })
    }catch(e){
        console.error(e);
        res.status(500).send("Error al obtener las materias");
    }
}

export const crearMaterias = async (req, res) => {
    try {
        const { nombre, idSemestre } = req.body
        const urlImagen = req.file ? `${req.protocol}://${req.get('host')}/image/${req.file.filename}` : null;
        const materia = await Materia.create({ nombre, idSemestre, urlImagen })
        res.json(materia)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const obtenerMateria = async (req, res) => {
    try {
        const id = req.params.id
        const materia = await Materia.findByPk(id)
        if (materia) {
          res.json(materia);
        } else {
          res.status(404).json({ mensaje: "Libro no encontrado" });
        }
    } catch (e) {
        console.error(e);
        res.status(500).send("Error al obtener la materia");
    }
}