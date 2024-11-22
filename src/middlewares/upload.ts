import multer from "multer"
import path from "path"

export const uploadMiddleware = () => {

}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname +"../../../public/static/"))
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
        cb(null, uniqueSuffix + path.extname(file.originalname)) // Nome do arquivo único
    },
})

const fileFilter = (req: any, file: any, cb:any) => {
    const allowedTypes = ["image/jpeg", "image/png"]
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(new Error("Only JPEG and PNG images are allowed."))
    }
}

export const UploadMiddleaware = multer({
    storage,
    fileFilter

})