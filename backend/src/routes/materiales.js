import { Router } from "express";
import {
  crearMaterial,
  crearSeccion,
  nuevoMaterial,
  obtenerSeccionesDeMateria,
} from "../controllers/materialController.js";
import upload, { bucket } from "../middlewares/upload.js";

const materiales = Router();

materiales.post("/seccion", crearSeccion);
materiales.get("/materia/:id/seccion", obtenerSeccionesDeMateria);

materiales.post("/material", upload.single("archivo"), crearMaterial);


materiales.post("/upload", upload.single("archivo"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("No se ha subido ningún archivo.");
    }

    // Crea un archivo en el bucket con el nombre del archivo subido
    const blob = bucket.file(req.file.originalname);
    const blobStream = blob.createWriteStream({
      resumable: false, // Opcional: deshabilita las subidas reanudables
      metadata: {
        contentType: req.file.mimetype,
      },
    });

    blobStream.on("error", (err) => {
      res.status(500).send(`Error al subir archivo: ${err.message}`);
    });

    blobStream.on("finish", () => {
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
      res.status(200).send(`Archivo subido exitosamente. URL: ${publicUrl}`);
    });

    blobStream.end(req.file.buffer);
  } catch (error) {
    res.status(500).send(`Error en el servidor: ${error.message}`);
  }
});

export default materiales;
