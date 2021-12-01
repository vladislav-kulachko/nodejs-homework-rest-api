const {checkSchema} = require("express-validator")
const Contact = require("../model/contact")

const validationRulesPostContact = checkSchema({
  name: {
    in: ["body"],
    notEmpty: true,
    trim: true,
    errorMessage: "Пожалуйста введите имя!",
    bail: true,
    isLength: {
      options: {max: 25},
      errorMessage: "Превышен лимит. Максимальная длинна имени 25 символов."
    },
    matches: {
      options: ["^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"],
      errorMessage: "Имя может содержать только буквы, тире, пробелы, апостроф."
    }
  },
  phone: {
    in: ["body"],
    notEmpty: true,
    trim: true,
    errorMessage: "Пожалуйста введите номер!",
    bail: true,
    isLength: {
      options: {min: 10, max: 20},
      errorMessage:
        "Длинна номера должна быть не менее 10 символов в сокращенном формате.",
      bail: true
    },
    matches: {
      options: [
        "^([+]\\d{2})?\\s?[(]?\\d{3}[)]?\\s?\\d{3}[-]?\\d{2}[-]?\\d{2}$"
      ],
      errorMessage:
        "Введите номер телефона в формате:  +01 (234) 567-89-99, +01 (234) 5678999, +012345678999, 0123456789"
    },
    custom: {
      options: async value => {
        const phone = await Contact.findOne({phone: value})
        if (phone) {
          throw new Error(`Номер уже находится в спискe контактов`)
        }
      }
    }
  },
  email: {
    in: ["body"],
    if: {options: value => value},
    normalizeEmail: true,
    isEmail: {
      args: true,
      errorMessage:
        "Введите действительный электронный адрес в формате 'имя_пользователя@имя_домена' "
    },
    custom: {
      options: async value => {
        const email = await Contact.findOne({email: value})
        if (email) {
          throw new Error(`Почта уже находится в спискe контактов`)
        }
      }
    }
  }
})

const validationRulesPutContact = checkSchema({
  name: {
    in: ["body"],
    if: {options: value => value},
    isLength: {
      options: {max: 25},
      errorMessage: "Превышен лимит. Максимальная длинна имени 25 символов."
    },
    matches: {
      options: ["^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"],
      errorMessage: "Имя может содержать только буквы, тире, пробелы, апостроф."
    },
    trim: true
  },
  phone: {
    in: ["body"],
    trim: true,
    if: {options: value => value},
    isLength: {
      options: {min: 10, max: 13},
      errorMessage:
        "Длинна номера должна быть 10 символов в сокращенном формате и 13 в международном без учета скобок."
    },
    matches: {
      options: [
        "^([+]\\d{2})?\\s?[(]?\\d{3}[)]?\\s?\\d{3}[-]?\\d{2}[-]?\\d{2}$"
      ],
      errorMessage:
        "Введите номер телефона в формате:  +01 (234) 567-89-99, +01 (234) 5678999, +012345678999, 0123456789"
    }
  },
  email: {
    in: ["body"],
    trim: true,
    if: {options: value => value},
    isEmail: {
      args: true,
      errorMessage:
        "Введите действительный электронный адрес в формате 'имя_пользователя@имя_домена' "
    },
    normalizeEmail: true
  }
})

const validationRulesPatchFavorite = checkSchema({
  favorite: {
    in: ["body"],
    notEmpty: true,
    isBoolean: true,
    toBoolean: true,
    errorMessage: "Недопустимое значение"
  }
})

module.exports = {
  validationRulesPostContact,
  validationRulesPutContact,
  validationRulesPatchFavorite
}
