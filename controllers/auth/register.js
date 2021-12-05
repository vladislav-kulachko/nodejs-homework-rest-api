const {Conflict} = require("http-errors")
const gravatar = require("gravatar")
const uuid = require("crypto").randomUUID()
const sgMail = require("@sendgrid/mail")
require("dotenv").config()
const {User} = require("../../model/index")

const {SG_API_KEY} = process.env

sgMail.setApiKey(SG_API_KEY)

const register = async (req, res) => {
  const {email, password} = req.body
  const avatarURL = gravatar.url(email, {s: "250", r: "x", d: "robohash"})
  const result = await User.findOne({email})
  if (result) {
    throw new Conflict(`Эта почта ${email}уже используется`)
  }
  const newUser = new User({email, avatarURL, verificationToken: uuid})
  newUser.setPassword(password)
  await newUser.save()
  const mail = {
    to: email,
    from: "vladcoool@gmail.com",
    subject: "Верификация.",
    html: `<a href=http://localhost:3000/api/auth/users/verify/:${uuid}>Нажмите для верификации<a>`
  }
  await sgMail.send(mail)
  res.status(201).json({
    status: "success",
    user: newUser
  })
}

module.exports = register
