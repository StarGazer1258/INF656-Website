const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10

const UserSchema = new Schema({
  companyName: { type: String, required: true },
  email: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true }
})

UserSchema.pre('save', function (next) {
  let user = this
  if (!user.isModified('password')) return next()

  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if(err) return next(err)

    bcrypt.hash(user.password, salt, (err, hash) => {
      if(err) return next(err)

      user.password = hash
      next()
    })
  })
})

UserSchema.methods.checkPassword = function (password, cb) {
  bcrypt.compare(password, this.password, (err, same) => {
    if(err) return cb(err)
    cb(null, same)
  })
}

module.exports = mongoose.model('User', UserSchema)