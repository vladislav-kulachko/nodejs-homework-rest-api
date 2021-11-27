const {Conflict} = require("http-errors")
const {User} = require("../../model/index")

const register = async (req, res) => {
  const {email, password} = req.body
  const result = await User.findOne({email})
  if (result) {
    throw new Conflict(`Эта почта ${email}уже используется`)
  }
  const newUser = new User({email})
  newUser.setPassword(password)
  newUser.save()
  res.status(201).json({
    status: "success",
    user: newUser
  })
}

module.exports = register
