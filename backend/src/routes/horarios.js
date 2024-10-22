import { Router } from "express";
import Grupo from "../models/grupo.js";
import Usuario from "../models/usuario.js";
import Clase from "../models/clase.js";
import Materia from "../models/materia.js";
import authToken from "../middlewares/authToken.js";

const horarios = Router();


horarios.get('/', authToken, async (req, res) => {
    const { id } = req.usuario

    const usuario = await Usuario.findByPk(id, {
        include: {
            model: Grupo,
            include: [
                {
                    model: Clase
                }, {
                    model: Materia,
                }
            ]
        }
    });

    if (!usuario) {
        return res.status(404).json({ message: "Usuario no encontrado" })
    }

    const clases = usuario.Grupos.flatMap(grupo => {
        return grupo.Clases.map(clase => {
            return {
                idGrupo: grupo.id,
                docente: grupo.docente,
                materia: grupo.Materium.nombre,
                lugar: clase.lugar,
                horaInicio: clase.horaInicio,
                horaFin: clase.horaFin,
                dia: clase.dia,
            };
        });
    });

    const clasesPorDia = {};
    clases.forEach(clase => {
        const dia = clase.dia;
        if (!clasesPorDia[dia]) {
            clasesPorDia[dia] = [];
        }
        clasesPorDia[dia].push(clase);
    });
    for (const dia in clasesPorDia) {
        clasesPorDia[dia].sort((a, b) => {
            return a.horaInicio.localeCompare(b.horaInicio);
        });
    }

    res.status(201).json(clasesPorDia)
})

horarios.get("/:id/grupos", async (req, res) => {
    const { id } = req.params;
    try {
        const grupos = await Grupo.findAll({
            where: { idMateria: id },
        })
        res.json(grupos)

    } catch (error) {
        console.error(error);
        res.status(500).send("Error al obtener los grupos");
        error;
    }
})

horarios.post('/', authToken, async (req, res) => {
   
    const { id } = req.usuario;
    const { idGrupo } = req.body

    try {
        const grupo = await Grupo.findByPk(idGrupo);
        const usuario = await Usuario.findByPk(id);

        if (!await usuario.hasGrupo(grupo)) {
            usuario.addGrupo(grupo)
        }
        res.json({ 'message': "se agrego la clase con exito" })
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Error agregar la clase' });
    }
})

export default horarios;