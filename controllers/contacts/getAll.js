const {Contact} = require("../../model/index")

const getAll = async (req, res, next) => {
  const {page = null, limit = null, favorite} = req.query
  const skip = (page - 1) * limit
  const {_id} = req.user
  const filter = {
    owner: _id
  }
  if (favorite) {
    filter.favorite = favorite
  }

  const contacts = await Contact.find(
    filter,
    "owner _id email name phone favorite",
    {skip: Number(skip), limit: Number(limit)}
  ).populate("owner", "email _id")
  res.status(200).json({status: "success", data: contacts})
}

module.exports = getAll
