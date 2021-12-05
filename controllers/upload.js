const {join} = require("path")
const multer = require("multer")

const tmpDir = join(__dirname, "../", "tmp")

const uploadConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tmpDir)
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})
const upload = multer({storage: uploadConfig})

module.exports = upload
