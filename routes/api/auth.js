const express = require("express")
const router = express.Router()
const controllersWrapper = require("../../controllers/wrapper")
const authenticate = require("../../controllers/authenticate")
const {
  register,
  login,
  logout,
  getUserAtToken
} = require("../../controllers/auth/index")
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
router.post(
  "/user/signout",
  controllersWrapper(authenticate),
  controllersWrapper(logout)
)
router.get(
  "/users/current",
  controllersWrapper(authenticate),
  controllersWrapper(getUserAtToken)
)
module.exports = router
