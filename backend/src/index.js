import express from "express";
import usuarios from './routes/usuarios.js'

const app = express();
const port = process.env.PORT ;

app.use(express.json());

app.use("/api/usuario",usuarios)



app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
