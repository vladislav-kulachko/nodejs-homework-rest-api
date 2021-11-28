const {Contact} = require("../../model/index")
const {NotFound, BadRequest, Unauthorized} = require("http-errors")
const mongoose = require("mongoose")

const getById = async (req, res, next) => {
  const {contactId} = req.params
  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    throw new BadRequest(`Not valid id: ${contactId}`)
  }
  const data = await Contact.findById(contactId)

  if (data.owner.valueOf() !== req.user._id.valueOf()) {
    throw new Unauthorized(`Access denied`)
  }
  if (!data) {
    throw new NotFound(`Contact with id: ${contactId} not found`)
  }
  res.status(200).json({status: "success", data})
}

module.exports = getById
