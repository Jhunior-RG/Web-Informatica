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