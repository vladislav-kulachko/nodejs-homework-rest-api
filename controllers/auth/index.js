const register = require("./register")
const login = require("./login")
const logout = require("./logout")
const getUserAtToken = require("./getUser")
const patchUserStatus = require("./patchStatus")
const patchUserAvatar = require("./patchUserAvatar")
module.exports = {
  register,
  login,
  logout,
  getUserAtToken,
  patchUserStatus,
  patchUserAvatar
}
