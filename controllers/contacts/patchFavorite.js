const {NotFound, BadRequest} = require("http-errors")
const {Contact} = require("../../model/index")
const mongoose = require("mongoose")

const patchFavorite = async (req, res, next) => {
  const {contactId} = req.params
  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    throw new BadRequest(`Not valid id: ${contactId}`)
  }
  const data = await Contact.findById(contactId)
  if (!data) {
    throw new NotFound(`Update fail. Contact with id: ${contactId} not found`)
  }
  data.favorite = req.body.favorite
  const updData = await Contact.findByIdAndUpdate(contactId, data, {
    returnDocument: "after"
  })
  res.status(200).json({status: "success", updData})
}

module.exports = patchFavorite
