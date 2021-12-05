const {NotFound} = require("http-errors")
const {User} = require("../../model")

const verify = async (req, res) => {
  const {verificationToken} = req.params
  const user = await User.findOne({verificationToken})
  if (!user) {
    throw new NotFound("Верификация не пройдена. Пользователь не найден")
  }
  await User.findByIdAndUpdate(user._id, {
    verificationToken: null,
    verify: true
  })
  res.status(200).json({status: "success"})
}
module.exports = verify
