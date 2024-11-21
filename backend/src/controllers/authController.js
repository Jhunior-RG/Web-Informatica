import jwt from "jsonwebtoken";
import Usuario from "../models/usuario.js";


const JWT_SECRET = process.env.JWT_SECRET;
const GOOGLE_USERINFO_URL = "https://www.googleapis.com/oauth2/v3/userinfo";


export const registrarUsuario = async (req, res) => {
    try {
        const { email } = req.body;
        const correosValidos = ["est.umss.edu"];
        const valido = correosValidos.includes(email.split("@")[1]);
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
    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario || usuario.password !== password) {
      return res.status(400).json({ message: "Correo o contraseña inválidos" });
    }

    const token = jwt.sign({ id: usuario.id }, JWT_SECRET, {
      expiresIn: "30d",
    });

    return res.json({ message: "Inicio de sesión exitoso", token });
  } catch (e) {
    return res.status(400).json({ message: e.message });
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
export const authGoogle = async (req, res) => {
    const { token } = req.body;

    try {
        // Obtener información del usuario desde la API de Google
        const response = await fetch(GOOGLE_USERINFO_URL, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error("No se pudo verificar el token de Google");
        }

        const profile = await response.json();
        const { email, name, sub: googleId } = profile;

        // Buscar o crear un usuario en la base de datos
        let usuario = await Usuario.findOne({ where: { email } });
        if (!usuario) {
            usuario = await Usuario.create({
                email,
                googleId,
                nombre:name,
                password: null,
            });
        }

        // Generar un JWT personalizado
        const jwtToken = jwt.sign({ id: usuario.id }, JWT_SECRET, { expiresIn: "1d" });

        res.status(200).json({ token: jwtToken });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Error al autenticar con Google" });
    }
};