import Clase from "../models/clase.js";
import Grupo from "../models/grupo.js";
import Materia from "../models/materia.js";

export const obtenerClases =  async (req, res) => {
    const { id } = req.params;
    try{
        const grupo =await Grupo.findByPk(id)
        if(!grupo){
            return res.status(404).send("Grupo no encontrado");
        }
        const clases = await Clase.findAll({where:{idGrupo: id}})
        res.json(clases);
    }catch(err){
        console.error(err);
        return res.status(500).send("Error al obtener las clases");
    }

}
export const obtenerGrupos = async (req, res) => {
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
}