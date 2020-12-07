const path = require('path')
const express = require('express')
const hbs = require('hbs')
const cors = require('cors')
const jwt = require('jsonwebtoken')

require('./db/mongoose')

const User = require('./db/models/user')
const WorkOrder = require('./db/models/workorder')

const PORT = 3000
const app = express()

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views/')
const partialsPath = path.join(__dirname, '../templates/partials/')

const SECRET_KEY = 'InF-656_FiNaL'

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.json())

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions))

function authenticate(req, res, next) {
  if (req.headers.authorization === undefined || req.headers.authorization.split(' ')[0] !== 'Bearer') {
    res.sendStatus(401)
    return
  }
  try {
    let verifyTokenResult = jwt.verify(req.headers.authorization.split(' ')[1], SECRET_KEY, (err, decode) => decode !== undefined ?  decode : err)

     if (verifyTokenResult instanceof Error) return res.sendStatus(401)
     next()
  } catch (err) {
    res.sendStatus(401)
  }
}

app.post('/api/users/register', (req, res) => {
  let newUser = new User({
    companyName: req.body.companyName,
    email: req.body.email,
    password: req.body.password
  })
  
  newUser.save((err) => {
    console.error(err)
    if(err) return res.sendStatus(400)
    return res.send({ status: 200 })
  })
})

app.delete('/api/users/unregister', (req, res) => {
  User.findOne({ email: req.body.email }, async (err, user) => {
    if(err) return res.sendStatus(404)

    await User.deleteOne({ _id: user._id }, err => {
      if(err) return res.sendStatus(500)

      return res.sendStatus(200)
    })
  })
})

app.post('/api/users/login', (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if(err) return res.sendStatus(404)
    
    user.checkPassword(req.body.password, (err, same) => {
      if(err) return res.sendStatus(500)

      delete user._doc.password

      if(same) {
        const expiresIn = 24 * 60 * 60
        const accessToken = jwt.sign({ id: user.id }, SECRET_KEY, {
          expiresIn: expiresIn
        })
        return res.send({ 'user': user, 'token': accessToken, 'expires_in': expiresIn })
      }

      return res.sendStatus(401)
    })
  })
})

app.post('/api/workOrders/create', authenticate, (req, res) => {
  let newWorkOrder = new WorkOrder({
    date: req.body.date,
    reference: req.body.reference,
    
    customerName: req.body.customerName,
    phoneNumber: req.body.phoneNumber,
    device: req.body.device,
    devicePassword: req.body.devicePassword,
    problem: req.body.problem,

    technician: req.body.technician,
    laborType: req.body.laborType,
    laborHours: req.body.laborHours,
    diagnosis: req.body.diagnosis,
    notes: req.body.notes,
    parts: req.body.parts
  })

  newWorkOrder.save(err => {
    if(err) return res.sendStatus(400)
    return res.sendStatus(201)
  })
})

app.get('/api/workorders/get', authenticate, (req, res) => {
  WorkOrder.find((err, result) => {
    if(err) return res.sendStatus(500)
    return res.send(result)
  })
})

app.get('/api/workorders/get/:id', authenticate, (req, res) => {
  WorkOrder.findOne({ _id: req.params.id }, (err, workOrder) => {
    if(err) return res.sendStatus(400)

    return res.send(workOrder)
  })
})

app.put('/api/workorders/update/:id', authenticate, (req, res) => {
  
  WorkOrder.findOne({ _id: req.params.id }, (err, workOrder) => {
    if(err) return res.sendStatus(400)

    workOrder.date = req.body.date || workOrder.date
    
    workOrder.customerName = req.body.customerName || workOrder.customerName
    workOrder.phoneNumber = req.body.phoneNumber || workOrder.phoneNumber
    workOrder.device = req.body.device || workOrder.device
    workOrder.devicePassword = req.body.devicePassword || workOrder.devicePassword
    workOrder.problem = req.body.problem || workOrder.problem

    workOrder.technician = req.body.technician || workOrder.technician
    workOrder.laborType = req.body.laborType || workOrder.laborType
    workOrder.laborHours = req.body.laborHours || workOrder.laborHours
    workOrder.diagnosis = req.body.diagnosis || workOrder.diagnosis
    workOrder.notes = req.body.notes || workOrder.notes
    workOrder.parts = req.body.parts || workOrder.parts

    WorkOrder.updateOne({ _id: req.params.id }, workOrder, (err, raw) => {
      if(err) return res.sendStatus(400)
      return res.sendStatus(200)
    })
  })

  
})

app.delete('/api/workorders/delete/:id', authenticate, (req, res) => {
  WorkOrder.deleteOne({ _id: req.params.id }, (err) => {
    if(err) return res.sendStatus(400)
    return res.sendStatus(200)
  })
})

app.get('/api/workorders/count', authenticate, (req, res) => {
  WorkOrder.countDocuments((err, count) => {
    if(err) return res.sendStatus(500)

    return res.send({ count: count })
  })
})

app.use(express.static(publicDirectoryPath))

app.get('*', (req, res) => {
  res.render('fourohfour')
})

app.post('*', (req, res) => {
  res.render('fourohfour')
})

app.listen(PORT)
console.log(`Server is listening on port ${PORT}`)