const express = require("express")
const router = express.Router()
const {NotFound, BadRequest} = require("http-errors")
const {checkSchema, validationResult} = require("express-validator")
const operations = require("../../model/index")

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

const validationRulesPatch = checkSchema({
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

const validate = validations => {
  return async (req, res, next) => {
    await Promise.all(validations.map(validation => validation.run(req)))
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return next(BadRequest(errors.array()))
    }
    return next()
  }
}

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

router.post("/", validate(validationRulesPost), async (req, res, next) => {
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

router.patch(
  "/:contactId",
  validate(validationRulesPatch),
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
