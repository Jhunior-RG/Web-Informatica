import express from "express";
import usuarios from './routes/usuarios.js'
import materiales from "./routes/materiales.js";
import materias from "./routes/materias.js";

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.use("/api/usuario", usuarios)
app.use('/api/material', materiales)
app.use('/api/materia',materias)
//app.use('/api/semestre',semestres)
//app.use('/api/clase',clases)



app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
