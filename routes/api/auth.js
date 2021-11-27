const express = require("express")
const router = express.Router()
const controllersWrapper = require("../../controllers/wrapper")
const {register, login} = require("../../controllers/auth/index")
const {validationRulesPostAuth} = require("../../validations/auth")
const validator = require("../../validations/midleware")

router.post(
  "/user/signup",
  validator(validationRulesPostAuth),
  controllersWrapper(register)
)

router.post(
  "/user/signin",
  validator(validationRulesPostAuth),
  controllersWrapper(login)
)

module.exports = router
