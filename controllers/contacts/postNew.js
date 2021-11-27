const {Contact} = require("../../model/index")

const postNew = async (req, res, next) => {
  const addedContact = await Contact.create(req.body)
  res.status(201).json({status: "success", data: addedContact})
}
module.exports = postNew
