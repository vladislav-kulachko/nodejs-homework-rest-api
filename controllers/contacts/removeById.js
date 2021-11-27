const {Contact} = require("../../model/index")
const {NotFound, BadRequest} = require("http-errors")
const mongoose = require("mongoose")

const removeById = async (req, res, next) => {
  const {contactId} = req.params
  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    throw new BadRequest(`Not valid id: ${contactId}`)
  }
  const data = await Contact.findByIdAndDelete(contactId)
  if (!data) {
    throw new NotFound(`Delete fail. Contact with id: ${contactId} not found`)
  }
  res.status(200).json({status: "success", data})
}
module.exports = removeById
