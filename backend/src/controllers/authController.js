


import jwt from 'jsonwebtoken'
import Usuario from '../models/usuario.js';
// eslint-disable-next-line no-undef
const JWT_SECRET = process.env.JWT_SECRET

export const registrarUsuario = async (req, res) => {
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

export const iniciarSession= async (req, res) => {
  try {
      const { email, password } = req.body
      console.log(req.body)
      const usuario = await Usuario.findOne({ where: { email } })
      if (usuario.password === password) {
          const token = jwt.sign({ id: usuario.id }, JWT_SECRET, { expiresIn: '1d' });
          res.status(200).json({ message: "Inicio de sesion exitoso", token })
          return
      }
      res.status(400).json({ message: 'Invalid email or password' })
  } catch (e) {
      res.status(400).json({ message: e.message })
  }
}

