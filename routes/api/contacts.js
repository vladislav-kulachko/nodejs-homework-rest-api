const express = require("express")
const router = express.Router()
const {NotFound} = require("http-errors")
const operations = require("../../model/index")
const {
  validationRulesPost,
  validationRulesPut
} = require("../../validations/schemas")
const validator = require("../../validations/midleware")

router.get("/", async (req, res, next) => {
  try {
    const contacts = await operations.listContacts()
    res.status(200).json({status: "success", data: {contacts}})
  } catch (err) {
    next(err)
  }
})

router.get("/:contactId", async (req, res, next) => {
  try {
    const {contactId} = req.params
    const contactById = await operations.getContactById(contactId)
    if (!contactById) {
      throw new NotFound(`Contact with id ${contactId} not found`)
    }
    res.status(200).json({status: "success", data: contactById})
  } catch (err) {
    next(err)
  }
})

router.post("/", validator(validationRulesPost), async (req, res, next) => {
  try {
    const addedContact = await operations.addContact(req.body)
    res.status(201).json({status: "success", data: addedContact})
  } catch (err) {
    next(err)
  }
})

router.delete("/:contactId", async (req, res, next) => {
  try {
    const {contactId} = req.params
    const deletedContact = await operations.removeContact(contactId)
    if (!deletedContact) {
      throw new NotFound(`Delete fail. Contact with id ${contactId} not found`)
    }
    res.status(200).json({status: "success", data: deletedContact})
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
      const updContact = await operations.updateContact(contactId, req.body)
      if (!updContact) {
        throw new NotFound(
          `Update fail. Contact with id ${contactId} not found`
        )
      }
      res.status(200).json({status: "success", data: updContact})
    } catch (err) {
      next(err)
    }
  }
)

module.exports = router
