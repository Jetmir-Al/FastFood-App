import multer from "multer";
import path from "path";

export const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/public/images');
    },
    filename: (req, file, cb) => {
        const uniqueName = path.parse(file.originalname).name + "_" + Date.now() + path.extname(file.originalname);
        cb(null, uniqueName);
    }
});

export const upload = multer({
    storage: storage
});
