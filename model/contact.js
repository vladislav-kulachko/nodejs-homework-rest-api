const {Schema, model} = require("mongoose")

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"]
    },
    email: {
      type: String
    },
    phone: {
      type: String,
      required: [true, "Set phone for contact"]
    },
    favorite: {
      type: Boolean,
      default: false
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "users"
    }
  },
  {versionKey: false, timestamps: true}
)

const Contact = model("contacts", contactSchema)

module.exports = Contact
