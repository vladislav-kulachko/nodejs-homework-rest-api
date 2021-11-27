const {BadRequest} = require("http-errors")
const {validationResult} = require("express-validator")

const validator = validations => {
  return async (req, res, next) => {
    await Promise.all(validations.map(validation => validation.run(req)))
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      next(BadRequest(errors.array()))
    }
    return next()
  }
}

module.exports = validator
