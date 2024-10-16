


export const resgistrarUsuario = async (req, res) => {
  try {
    await Usuario.create(req.body);
    res.status(201).json({ message: "Usuario creado Correctamente" });
  } catch (e) {
    if (e.parent.code === "23505") {
      res.status(400).json({ message: "el correo ya se encuentra registrado" });
    } else {
      res.status(400).json({ message: e.message });
    }
  }
};

