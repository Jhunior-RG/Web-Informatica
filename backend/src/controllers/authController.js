import jwt from "jsonwebtoken";
import Usuario from "../models/usuario.js";
// eslint-disable-next-line no-undef
const JWT_SECRET = process.env.JWT_SECRET;

export const registrarUsuario = async (req, res) => {
    try {
        const { email } = req.body;
        const correosValidos = ['est.umss.edu']
        const valido = correosValidos.includes(email.split('@')[1]);
        if (!valido) {
            return res.status(400).json({ message: "Correo no válido" });
        }
        const usuario = await Usuario.findOne({
            where: { email },
        });

        if (usuario) {
            return res
                .status(400)
                .json({ message: "El correo ya se encuentra registrado" });
        }

        await Usuario.create(req.body);
        res.status(201).json({ message: "Usuario creado Correctamente" });
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
};

export const iniciarSession = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email, password);

        const usuario = await Usuario.findOne({ where: { email } });
        if (!usuario || usuario.password !== password) {
            res.status(400).json({ message: "correo o contraseña invalido" });
        }
        const token = jwt.sign({ id: usuario.id }, JWT_SECRET, {
            expiresIn: "30d",
        });
        res.json({ message: "Inicio de sesion exitoso", token });
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
};

export const obtenerPerfil = async (req, res) => {
    const { id } = req.usuario;
    try {
        const usuario = await Usuario.findByPk(id);
        res.json({ data: usuario, message: "perfil obtenido exitosamente" });
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
};

