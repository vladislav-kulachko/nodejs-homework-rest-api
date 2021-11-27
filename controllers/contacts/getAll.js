const {Contact} = require("../../model/index")

const getAll = async (req, res, next) => {
  const {page = null, limit = null} = req.query
  const skip = (page - 1) * limit
  const {_id} = req.user
  const contacts = await Contact.find(
    {owner: _id},
    "owner _id email name phone",
    {skip: Number(skip), limit: Number(limit)}
  ).populate("owner", "email _id")
  res.status(200).json({status: "success", data: contacts})
}

module.exports = getAll
