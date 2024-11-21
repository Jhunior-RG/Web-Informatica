import express from "express";

import materias from "./routes/materias.js";
import usuarios from "./routes/usuarios.js";
import materiales from "./routes/materiales.js";
import horarios from "./routes/horarios.js";

import auth from "./routes/auth.js";

import cors from "cors";
import setupAssociations from "./models/associations.js";
import db from "./config/db.js";
import semestres from "./routes/semestres.js";
import grupos from "./routes/grupos.js";
import { createAdmin, seed } from "./config/data.js";
import morgan from 'morgan'
import pensum from "./routes/pensum.js";

const app = express();
const port = process.env.PORT;

const iniciarBD = async () => {
  try {
    await db.authenticate();
    console.log("Conexión exitosa con la base de datos.");

    setupAssociations();

    await db.sync({ alter: true });
    //seed()
    createAdmin()
    
  } catch (error) {
    console.error("Error de conexión a la base de datos:", error);
    
  }
};

iniciarBD();

app.use(morgan('dev'))
app.use(cors());
app.use(express.json());

app.use("/image", express.static("image"));

app.use("/api", auth);
app.use("/api/usuarios", usuarios);
app.use("/api/materiales", materiales);
app.use("/api/materias", materias);
app.use("/api/horarios", horarios);
app.use("/api/grupos", grupos);

app.use("/api/semestres", semestres);
app.use("/api/pensum", pensum)

//app.use('/api/clase',clases)

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
