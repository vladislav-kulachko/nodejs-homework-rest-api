const express = require("express")
const router = express.Router()
const {
  getAll,
  getById,
  removeById,
  postNew,
  patchFavorite,
  putById
} = require("../../controllers/contacts/index")
const controllersWrapper = require("../../controllers/wrapper")
const {
  validationRulesPostContact,
  validationRulesPutContact,
  validationRulesPatchFavorite
} = require("../../validations/contacts")
const validator = require("../../validations/midleware")
const authenticate = require("../../controllers/authenticate")

router.get("/", controllersWrapper(authenticate), controllersWrapper(getAll))

router.get(
  "/:contactId",
  controllersWrapper(authenticate),
  controllersWrapper(getById)
)

router.post(
  "/",
  controllersWrapper(authenticate),
  validator(validationRulesPostContact),
  controllersWrapper(postNew)
)

router.delete(
  "/:contactId",
  controllersWrapper(authenticate),
  controllersWrapper(removeById)
)

router.put(
  "/:contactId",
  controllersWrapper(authenticate),
  validator(validationRulesPutContact),
  controllersWrapper(putById)
)

router.patch(
  "/:contactId/favorite",
  controllersWrapper(authenticate),
  validator(validationRulesPatchFavorite),
  controllersWrapper(patchFavorite)
)

module.exports = router
