
import { Usuario } from '../models/usuario.js'


export const resgistrarUsuario = async (req, res) => {
  try {
    const { email } = req.body
    const usuario = await Usuario.findOne({
      where:
        email
    })

    if (usuario) {
      return res.status(400).json({ message: "El correo ya se encuentra registrado" });
    }

    await Usuario.create(req.body);
    res.status(201).json({ message: "Usuario creado Correctamente" });

  } catch (e) {

    res.status(400).json({ message: e.message });

  }
};

