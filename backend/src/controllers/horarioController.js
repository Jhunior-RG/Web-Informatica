import Clase from "../models/clase.js";
import Grupo from "../models/grupo.js";
import Materia from "../models/materia.js";
import Usuario from "../models/usuario.js";

export const obtenerHorario = async (req, res) => {
    const { id } = req.usuario;

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
        const materia = grupo.Materium
        return grupo.Clases.map(clase => {
            return {
                idGrupo: grupo.id,
                docente: grupo.docente,
                grupo: grupo.nombre,
                materia: materia.nombre,
                lugar: clase.lugar,
                horaInicio: clase.horaInicio,
                horaFin: clase.horaFin,
                dia: clase.dia,
            };
        });
    });
    //console.log(clases)
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
    //console.log(clasesPorDia)
    res.status(201).json({ hola: "hola mundo", "data": clasesPorDia })
}
export const eliminarGrupo = async (req,res)=>{
    const {idGrupo} = req.params;
    const {id} = req.usuario;
    try{

        const usuario = await Usuario.findByPk(id)
        if(!usuario){
            return res.status(404).json({message: 'Usuario no encontrado'})
        }
        const grupo = await Grupo.findByPk(idGrupo)
        if(!grupo){
            return res.status(404).json({message: 'Grupo no encontrado'})
        }
        await usuario.removeGrupo(grupo)
        res.json({message: 'Grupo eliminado con exito'})
    }catch(e){
        console.error(e);
        res.status(500).json({message: 'Error al eliminar grupo'})
        return
    }

}

export const obtenerGrupos =  async (req, res) => {
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
}

