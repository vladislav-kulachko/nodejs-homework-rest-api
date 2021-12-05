const uuid = require("crypto").randomUUID()
const sgMail = require("@sendgrid/mail")
const {BadRequest} = require("http-errors")
require("dotenv").config()
const {User} = require("../../model/index")

const {SG_API_KEY} = process.env

sgMail.setApiKey(SG_API_KEY)

const resendVerify = async (req, res) => {
  if (!req.body.email) {
    throw new BadRequest("Введите почту для верификации")
  }
  const user = await User.findOne({email: req.body.email})
  if (user.verify) {
    throw new BadRequest("Пользователь уже верифицирован")
  }
  const mail = {
    to: req.body.email,
    from: "vladcoool@gmail.com",
    subject: "Повторная верификация.",
    html: `<a href=http://localhost:3000/api/auth/users/verify/:${uuid}>Нажмите для верификации<a>`
  }
  await sgMail.send(mail)
}
module.exports = resendVerify
