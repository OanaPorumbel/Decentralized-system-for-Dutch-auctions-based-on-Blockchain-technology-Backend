const multer = require("multer");
const path = require("path");

let storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "C:\\Users\\aoana\\Desktop\\Html\\Licenta\\uploads")
    },
    filename: function (req, file, cb) {
        cb(null, req.body.address + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage
})

module.exports = upload;