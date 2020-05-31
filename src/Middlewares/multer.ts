
import multer from 'multer';
import path from 'path'
import { v4 as uuid } from 'uuid' 

const storage = multer.diskStorage({
    destination: path.join(__dirname,'../tmp'),
    filename: (req, file, cb) => {
        cb(null, uuid() + path.extname(file.originalname))
    }
});

const multerStorage = multer({storage,limits: {fileSize: 1000000}})

export default multerStorage;


