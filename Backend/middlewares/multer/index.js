import multer from "multer";
import 'dotenv/config'

const internalStorage = multer.diskStorage({
    destination:(req,file, cb)=>{
        cb(null, 'uploads')
    },
    filename: (req, file, cb)=>{
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random()*1E9)}`
        const fileExtension = file.originalname.split('.').pop()
        cb(null, `${file.fieldname}-${uniqueSuffix}.${fileExtension}`)
    }   
})

const diskUpload = multer({storage: internalStorage})

export default diskUpload