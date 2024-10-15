import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET

const authToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    console.log(token    )

    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado' })
    }

    try {
        const verificado = jwt.verify(token,JWT_SECRET)
        req.usuario = verificado
        next()
    } catch (err) {
        res.status(400).json({message: 'Token invalido'})
    }
}

export default authToken