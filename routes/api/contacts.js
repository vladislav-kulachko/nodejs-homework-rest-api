const express = require("express")
const router = express.Router()
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
    const contacts = await Contact.find()
    res.status(200).json({status: "success", data: contacts})
  } catch (err) {
    next(err)
  }
})

router.get("/:contactId", async (req, res, next) => {
  try {
    const {contactId} = req.params
    await Contact.findById(contactId, (err, data) => {
      if (err || data === null) {
        next(NotFound(`Contact with id ${contactId} not found`))
      } else res.status(200).json({status: "success", data})
    }).clone()
  } catch (err) {
    next(err)
  }
})

router.post("/", validator(validationRulesPost), async (req, res, next) => {
  try {
    const addedContact = await Contact.create(req.body)
    res.status(201).json({status: "success", data: addedContact})
  } catch (err) {
    next(err)
  }
})

router.delete("/:contactId", async (req, res, next) => {
  try {
    const {contactId} = req.params
    await Contact.findByIdAndDelete(contactId, (err, data) => {
      if (err || data === null) {
        next(NotFound(`Delete fail. Contact with id ${contactId} not found`))
      } else res.status(200).json({status: "success", data})
    }).clone()
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
      await Contact.findByIdAndUpdate(
        contactId,
        req.body,
        {
          returnDocument: "after"
        },
        (err, data) => {
          if (err) {
            next(
              NotFound(
                `Update fail. ${err} Contact with id ${contactId} not found`
              )
            )
          } else res.status(200).json({status: "success", data})
        }
      ).clone()
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
      let contactUpd
      await Contact.findById(contactId, (err, data) => {
        if (err || data === null) {
          next(
            NotFound(
              `Update fail. ${err} Contact with id ${contactId} not found`
            )
          )
        } else {
          contactUpd = data
          contactUpd.favorite = req.body.favorite
          Contact.findByIdAndUpdate(
            contactId,
            contactUpd,
            {
              returnDocument: "after"
            },
            (_, data) => {
              res.status(200).json({status: "success", data})
            }
          )
        }
      }).clone()
    } catch (err) {
      next(err)
    }
  }
)

module.exports = router
