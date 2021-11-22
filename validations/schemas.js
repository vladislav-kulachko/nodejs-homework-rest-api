const {checkSchema} = require("express-validator")
const operations = require("../model/index")

const validationRulesPost = checkSchema({
  name: {
    in: ["body"],
    notEmpty: true,
    trim: true,
    errorMessage: "Пожалуйста введите имя!",
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
    },
    custom: {
      options: async value => {
        const list = await operations.listContacts()
        if (list.find(({phone}) => phone === value)) {
          return await Promise.reject(
            new Error(`Номер ${value} уже находится в спискe контактов`)
          )
        }
      }
    }
  },
  email: {
    in: ["body"],
    if: {options: value => value},
    isEmail: {
      args: true,
      errorMessage:
        "Введите действительный электронный адрес в формате 'имя_пользователя@имя_домена' "
    },
    normalizeEmail: true,
    custom: {
      options: async value => {
        const list = await operations.listContacts()
        if (list.find(({email}) => email === value)) {
          return await Promise.reject(
            new Error(`Почта ${value} уже находится в спискe контактов`)
          )
        }
      }
    }
  }
})

const validationRulesPut = checkSchema({
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

module.exports = {validationRulesPost, validationRulesPut}
