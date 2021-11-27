const {Schema, model} = require("mongoose")
const bcrypt = require("bcrypt")
const userSchema = Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"]
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter"
    },
    token: {
      type: String,
      default: null
    }
  },
  {versionKey: false, timestamps: true}
)

userSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync())
}
userSchema.methods.comparePasswords = function (password) {
  return bcrypt.compareSync(password, this.password)
}
const User = model("users", userSchema)

module.exports = User
