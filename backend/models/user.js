const mongoose = require('mongoose')
const { schema } = mongoose

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true }
})

const UserModel = mongoose.model('User', userSchema)

module.exports = UserModel
