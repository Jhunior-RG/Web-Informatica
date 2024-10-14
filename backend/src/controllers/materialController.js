export const nuevoMaterial = (req,res)=> {
    const {id}= req.params
    res.status(201).json({id:id})
} 