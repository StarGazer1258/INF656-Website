const mongoose = require('mongoose')
const Schema = mongoose.Schema

const WorkOrderSchema = new Schema({
  date: { type: Date, required: true },
  reference: { type: String, required: true, index: { unique: true } },
  
  customerName: String,
  phoneNumber: String,
  device: String,
  devicePassword: String,
  problem: String,

  technician: String,
  laborType: String,
  laborHours: Number,
  diagnosis: String,
  notes: String,
  parts: String
})

module.exports = mongoose.model('WorkOrder', WorkOrderSchema)