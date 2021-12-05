const {Conflict} = require("http-errors")
const {User} = require("../../model/index")
const gravatar = require("gravatar")

const register = async (req, res) => {
  const {email, password} = req.body
  const avatar = gravatar.url(email, {s: "250", r: "x", d: "robohash"})
  const result = await User.findOne({email})
  if (result) {
    throw new Conflict(`Эта почта ${email}уже используется`)
  }
  const newUser = new User({email})
  newUser.setPassword(password)
  newUser.avatar = avatar
  await newUser.save()
  res.status(201).json({
    status: "success",
    user: newUser
  })
}

module.exports = register
