const {BadRequest} = require("http-errors")
const {User} = require("../../model/index")
const mongoose = require("mongoose")

const logout = async (req, res) => {
  const {_id} = req.user
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    throw new BadRequest(`Not valid id: ${_id}`)
  }
  await User.findByIdAndUpdate(_id, {
    token: null
  })
  res.status(204).json({status: "success"})
}

module.exports = logout
