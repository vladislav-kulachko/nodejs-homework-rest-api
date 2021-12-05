const {Unauthorized} = require("http-errors")
const {User} = require("../../model/index")
const jwt = require("jsonwebtoken")
const {SECRET_KEY} = process.env

const login = async (req, res) => {
  const {email, password} = req.body
  const user = await User.findOne({email})
  if (!user || !user.comparePasswords(password)) {
    throw new Unauthorized(
      "Вы ввели неверный логин или пароль. Повторите вход или зарегистрируйтесь."
    )
  }
  if (!user.verify) {
    throw new Unauthorized(
      "Пройдите верификацию. Ссылка отправлена на почту, указанную при регистрации."
    )
  }

  const payload = {id: user._id}
  const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "1h"})
  const userWithToken = await User.findByIdAndUpdate(
    user._id,
    {token},
    {
      new: true
    }
  )
  res.status(200).json({
    status: "success",
    user: userWithToken
  })
}

module.exports = login
