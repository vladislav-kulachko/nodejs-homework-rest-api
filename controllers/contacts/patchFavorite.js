const {NotFound, BadRequest, Unauthorized} = require("http-errors")
const {Contact} = require("../../model/index")
const mongoose = require("mongoose")

const patchFavorite = async (req, res) => {
  const {contactId} = req.params
  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    throw new BadRequest(`Not valid id: ${contactId}`)
  }
  const data = await Contact.findById(contactId)

  if (data.owner.valueOf() !== req.user._id.valueOf()) {
    throw new Unauthorized(`Access denied`)
  }
  if (!data) {
    throw new NotFound(`Update fail. Contact with id: ${contactId} not found`)
  }
  const updData = await Contact.findByIdAndUpdate(contactId, req.body, {
    returnDocument: "after"
  })
  res.status(200).json({status: "success", updData})
}

module.exports = patchFavorite
