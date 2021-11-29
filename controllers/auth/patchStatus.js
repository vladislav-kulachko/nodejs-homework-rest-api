const {User} = require("../../model/index")

const patchUserStatus = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1]
  const user = await User.findOneAndUpdate(token, req.body, {new: true})
  res.status(200).json({
    status: "success",
    user
  })
}
module.exports = patchUserStatus
