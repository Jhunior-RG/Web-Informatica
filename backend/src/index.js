import express from "express";

import usuarios from './routes/usuarios.js'
import materiales from "./routes/materiales.js";
import materias from "./routes/materias.js";


import auth from "./routes/auth.js";

import cors from "cors";

const app = express();
const port = process.env.PORT;


app.use(cors());
app.use(express.json());

app.use('/image', express.static('image'));

app.use('/api', auth )
app.use("/api/usuario", usuarios)
app.use('/api/material', materiales)
app.use('/api/materia',materias)

//app.use('/api/semestre',semestres)
//app.use('/api/clase',clases)



app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
