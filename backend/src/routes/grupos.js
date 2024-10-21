import { Router } from "express";
import Grupo from "../models/grupo.js";
import Clase from "../models/clase.js";

const grupos = Router()

grupos.get('/:id/clases', async (req, res) => {
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

})

export default grupos;