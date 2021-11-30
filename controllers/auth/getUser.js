const {User} = require("../../model/index")

const getUserAtToken = async (req, res) => {
  const user = await User.findById(req.user._id, "email subscription")
  res.status(200).json({
    status: "success",
    user
  })
}
module.exports = getUserAtToken
