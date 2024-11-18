import { bucket } from "../middlewares/upload.js";
import Material from "../models/material.js";
import Seccion from "../models/seccion.js";
import Usuario from "../models/usuario.js";

export const nuevoMaterial = (req, res) => {
    const { id } = req.params;
    res.status(201).json({ id: id });
};

export const crearSeccion = async (req, res) => {
    try {
        const { nombre, idMateria } = req.body;
        await Seccion.create({ nombre, idMateria });

        res.status(201).json({
            message: "Sección creada exitosamente.",
        });
    } catch (error) {
        console.error("Error al crear la sección:", error);
        res.status(500).json({
            message: "Hubo un error al crear la sección",
        });
    }
};

export const obtenerSeccionesDeMateria = async (req, res) => {
    try {
        const { id } = req.params;

        const secciones = await Seccion.findAll({
            where: {
                idMateria: id,
            },
            include: [
                {
                    model: Material,
                },
            ],
        });

        res.status(200).json(secciones);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const crearMaterial = async (req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.usuario.id);
        if (!req.file) {
            return res.status(400).send("No se ha subido ningún archivo.");
        }

        const metadata = JSON.parse(req.body.metadata);
        console.log(metadata);
        const blob = bucket.file(req.file.originalname);
        const blobStream = blob.createWriteStream({
            resumable: false,
            metadata: {
                contentType: req.file.mimetype,
            },
        });

        blobStream.on("error", (err) => {
            res.status(500).send(`Error al subir archivo: ${err.message}`);
        });
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
        console.log(publicUrl);
        blobStream.on("finish", () => {
            console.log(`Archivo subido exitosamente. URL: ${publicUrl}`);
        });
        blobStream.end(req.file.buffer);

        const { nombre, descripcion, idSeccion } = metadata;
        await Material.create({
            url: publicUrl,
            nombre,
            descripcion,
            idSeccion,
            idUsuario: usuario.id,
        });

        res.status(201).json({
            message: "Material creado exitosamente.",
        });
    } catch (error) {
        res.status(500).send(`Error en el servidor: ${error.message}`);
    }
};

export const crearLink = async (req, res) => {
    try {
        const { url, nombre, descripcion, idSeccion } = req.body;
        await Material.create({ url, nombre, descripcion, idSeccion });

        res.status(201).json({
            message: "Material con link Creado exitosamente",
        });
    } catch (error) {
        res.status(500).send(`Error en el servidor: ${error.message}`);
    }
};
export const eliminarMaterial = async (req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.usuario.id);
        const { id } = req.params;
        const material = await Material.findByPk(id);

        if (usuario.id !== material.idUsuario && usuario.rol !== "admin") {
            return res.status(401).json({
                message: "No tienes permisos para eliminar este material",
            }); 
        }

        //eliminar del bucket
        const url = material.url;
        if (url.includes("googleapis")) {
            const fileName = url.split("/").pop();
            // validar si existe
            const [exists] = await bucket.file(fileName).exists();

            if (exists) {
                await bucket.file(fileName).delete();
                console.log(`${fileName} eliminado`);
            }
        }

        await material.destroy();

        res.json({ message: "Material eliminado exitosamente" });
    } catch (e) {
        console.error(e);
        res.status(404).json({ message: "No se pudo eliminar el Material" });
    }
};
