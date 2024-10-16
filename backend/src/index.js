import express from "express";

import materias from "./routes/materias.js";
import usuarios from './routes/usuarios.js'
import materiales from "./routes/materiales.js";
import horarios from './routes/horarios.js'

import auth from "./routes/auth.js";

import cors from "cors";
import setupAssociations from './models/associations.js';
import db from "./config/db.js";

const app = express();
const port = process.env.PORT;

const iniciarBD = async () => {
    try {
        await db.authenticate();
        console.log("Conexión exitosa con la base de datos.");

        setupAssociations();

        await db.sync({alter:true});
    } catch (error) {
        console.error("Error de conexión a la base de datos:", error);

    }
}

iniciarBD();

app.use(cors());
app.use(express.json());

app.use('/image', express.static('image'));

app.use('/api', auth)
app.use("/api/usuario", usuarios)
app.use('/api/material', materiales)
app.use('/api/materia', materias)
app.use('/api/horario', horarios)
app.use('/api/horarios', horarios)

//app.use('/api/semestre',semestres)
//app.use('/api/clase',clases)



app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
