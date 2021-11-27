const {User} = require("../model/index")
const {Unauthorized, NotFound} = require("http-errors")
const jwt = require("jsonwebtoken")
const {SECRET_KEY} = process.env

const authenticate = async (req, res, next) => {
  const [bearer, token] = req.headers.authorization.split(" ")
  if (bearer !== "Bearer") {
    throw new Unauthorized(
      "Вы не авторизированы. Зарегистрируйтесь или войдите."
    )
  }
  try {
    const {id} = jwt.verify(token, SECRET_KEY)
    const user = await User.findById(id)
    if (!user) {
      throw new NotFound()
    }
    req.user = user
    next()
  } catch (err) {
    throw new Unauthorized(
      "Вы не авторизированы. Зарегистрируйтесь или войдите."
    )
  }
}

module.exports = authenticate
