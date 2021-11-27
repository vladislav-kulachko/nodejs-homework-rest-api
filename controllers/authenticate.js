const {User} = require("../model/index")
const {Unauthorized, NotFound} = require("http-errors")
const jwt = require("jsonwebtoken")
const {SECRET_KEY} = process.env

const authenticate = async (req, res, next) => {
  if (!req.headers.authorization) {
    throw new Unauthorized("Вы не авторизированы. Отсутствует токен.")
  }
  const token = req.headers.authorization.split(" ")
  try {
    const {id} = jwt.verify(token[1], SECRET_KEY)
    const user = await User.findById(id)
    if (!user) {
      throw new NotFound(`Пользователь с id: ${id} удален.`)
    }
    req.user = user
    next()
  } catch (err) {
    throw new Unauthorized(
      "Вы не авторизированы. Зарегистрируйтесь или выполните вход."
    )
  }
}

module.exports = authenticate
