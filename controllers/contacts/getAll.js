const {Contact} = require("../../model/index")

const getAll = async (req, res, next) => {
  const contacts = await Contact.find()
  res.status(200).json({status: "success", data: contacts})
}

module.exports = getAll
