const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const {NotFound} = require("http-errors")
const {
  validationRulesPost,
  validationRulesPatchFavorite,
  validationRulesPut
} = require("../../validations/schemas")
const validator = require("../../validations/midleware")
const Contact = require("../../model/contact")

router.get("/", async (req, res, next) => {
  try {
    const data = await Contact.find()
    res.status(200).json({status: "success", data})
  } catch (err) {
    next(err)
  }
})

router.get("/:contactId", async (req, res, next) => {
  try {
    const {contactId} = req.params
    if (!mongoose.Types.ObjectId.isValid(contactId)) {
      throw new NotFound(`Contact with id ${contactId} not found`)
    }
    const data = await Contact.findById(contactId)
    res.status(200).json({status: "success", data})
  } catch (err) {
    next(err)
  }
})

router.post("/", validator(validationRulesPost), async (req, res, next) => {
  try {
    const data = await Contact.create(req.body)
    res.status(201).json({status: "success", data})
  } catch (err) {
    next(err)
  }
})

router.delete("/:contactId", async (req, res, next) => {
  try {
    const {contactId} = req.params
    if (!mongoose.Types.ObjectId.isValid(contactId)) {
      throw new NotFound(`Delete fail. Contact with id ${contactId} not found`)
    }
    const data = await Contact.findByIdAndDelete(contactId)
    res.status(200).json({status: "success", data})
  } catch (err) {
    next(err)
  }
})

router.put(
  "/:contactId",
  validator(validationRulesPut),
  async (req, res, next) => {
    try {
      const {contactId} = req.params
      if (!mongoose.Types.ObjectId.isValid(contactId)) {
        throw new NotFound(
          `Update fail. Contact with id ${contactId} not found`
        )
      }
      const data = await Contact.findByIdAndUpdate(contactId, req.body, {
        returnDocument: "after"
      })
      res.status(200).json({status: "success", data})
    } catch (err) {
      next(err)
    }
  }
)

router.patch(
  "/:contactId/favorite",
  validator(validationRulesPatchFavorite),
  async (req, res, next) => {
    try {
      const {contactId} = req.params
      if (!mongoose.Types.ObjectId.isValid(contactId)) {
        throw new NotFound(
          `Update fail. Contact with id ${contactId} not found`
        )
      }
      const data = await Contact.findById(contactId)
      data.favorite = req.body.favorite
      const updData = await Contact.findByIdAndUpdate(contactId, data, {
        returnDocument: "after"
      })
      res.status(200).json({status: "success", updData})
    } catch (err) {
      next(err)
    }
  }
)

module.exports = router
