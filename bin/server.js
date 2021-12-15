const app = require("../app")
const mongoose = require("mongoose")

const {DB_HOST, PORT = 3000} = process.env

;(async () => {
  try {
    await mongoose.connect(DB_HOST)
    console.log("Successful connection to the database")
  } catch (err) {
    console.log(err.message)
    process.exit(1)
  }
})()

app.listen(PORT, () => {
  console.log(`Server running. Use our API on port: ${PORT}`)
})
