import { Router } from "express";
import authToken from "../middlewares/authToken.js";
import Grupo from "../models/grupo.js";
import Usuario from "../models/usuario.js";
import Clase from "../models/clase.js";
import Materia from "../models/materia.js";

const horarios = Router()

horarios.get('/', async (req, res) => {
    //const { id } = req.usuario;
    const id = 1

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

    res.status(201).json({
        "clases": clasesPorDia
    })
})

export default horarios