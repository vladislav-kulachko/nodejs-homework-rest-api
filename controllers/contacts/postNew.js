const {Contact} = require("../../model/index")

const postNew = async (req, res, next) => {
  const {_id} = req.user
  const addedContact = await Contact.create({...req.body, owner: _id})
  res.status(201).json({status: "success", data: addedContact})
}
module.exports = postNew
