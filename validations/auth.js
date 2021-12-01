const {checkSchema} = require("express-validator")

const validationRulesPostAuth = checkSchema({
  password: {
    in: ["body"],
    trim: true,
    notEmpty: true,
    isLength: {min: 6, max: 12},
    errorMessage: "Пожалуйста пароль не менее 6 символов и не более 12"
  },
  email: {
    in: ["body"],
    trim: true,
    normalizeEmail: true,
    notEmpty: true,
    isEmail: true,
    errorMessage:
      "Введите действительный электронный адрес в формате 'имя_пользователя@имя_домена' "
  },
  subscription: {in: ["body"], trim: true, isString: true}
})

module.exports = {validationRulesPostAuth}
