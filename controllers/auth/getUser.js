const {User} = require("../../model/index")

const getUserAtToken = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1]
  console.log(token)
  const user = await User.findOne({token}, "email subscription")
  res.status(200).json({
    status: "success",
    user
  })
}
module.exports = getUserAtToken
