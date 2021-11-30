const {User} = require("../../model/index")

const patchUserStatus = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.user._id, req.body, {new: true})
  res.status(200).json({
    status: "success",
    user
  })
}
module.exports = patchUserStatus
