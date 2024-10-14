import multer from 'multer'
import path from 'path';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'image/'); // Carpeta 'imagenes'
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Nombre único del archivo
    }
});

const upload = multer({ storage: storage });
export default upload
