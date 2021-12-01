const {Contact} = require("../../model/index")
const {NotFound, BadRequest, Unauthorized} = require("http-errors")
const mongoose = require("mongoose")

const putById = async (req, res, next) => {
  const {contactId} = req.params
  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    throw new BadRequest(`Not valid id: ${contactId}`)
  }
  const result = await Contact.findById(contactId, "owner")
  if (result.owner.valueOf() !== req.user._id.valueOf()) {
    throw new Unauthorized(`Access denied`)
  }
  const data = await Contact.findByIdAndUpdate(contactId, req.body, {
    returnDocument: "after"
  })
  if (!data) {
    throw new NotFound(`Update fail. Contact with id: ${contactId} not found`)
  }
  res.status(200).json({status: "success", data})
}

module.exports = putById
