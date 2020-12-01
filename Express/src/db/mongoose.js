const mongoose = require('mongoose')

const dbUrl = 'mongodb://localhost:27017/ezworkorders'
const connectionOptions = { useNewUrlParser: true, useUnifiedTopology: true }

mongoose.connect(dbUrl, connectionOptions)

mongoose.connection.on('connected', () => {
  console.log("Connected to DB!")
})

mongoose.connection.on('error', err => {
  console.log("DB error: " + err)
  return mongoose.connect(dbUrl, connectionOptions)
})

mongoose.connection.on('disconnected', () => {
  console.log("Disconnected from DB!")
})