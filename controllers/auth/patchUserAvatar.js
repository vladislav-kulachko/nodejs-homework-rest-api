const {User} = require("../../model/index")
const fs = require("fs/promises")
const {join} = require("path")
const Jimp = require("jimp")

const avaDir = join(__dirname, "../../", "public/avatars")

const patchUserAvatar = async (req, res) => {
  const {filename, path: tempFilePath} = req.file
  const id = req.user._id
  const ava = await Jimp.read(tempFilePath)
  ava.resize(250, 250).writeAsync(`${tempFilePath}`)
  const avatarUrl = join(avaDir, `${id}_${filename}`)
  const avaShortPath = join("/avatars", `${id}_${filename}`)
  await fs.rename(tempFilePath, avatarUrl)
  const user = await User.findByIdAndUpdate(
    id,
    {avatarUrl: avaShortPath},
    {new: true}
  )
  res.status(200).json({
    status: "success",
    user
  })
}
module.exports = patchUserAvatar
