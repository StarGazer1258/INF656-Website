const path = require("path");
const express = require("express");
const hbs = require("hbs");
const cors = require('cors')

require('./db/mongoose')

const User = require('./db/models/user');
const WorkOrder = require('./db/models/workorder');
const { query } = require("express");
const { send } = require("process");

const PORT = 3000;
const app = express();

const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views/");
const partialsPath = path.join(__dirname, "../templates/partials/");

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions))

app.post('/api/users/register', (req, res) => {
  let newUser = new User({
    username: req.query.username,
    password: req.query.password
  })
  
  newUser.save((err) => {
    if(err) return res.sendStatus(400)
    return res.sendStatus(201)
  })
})

app.delete('/api/users/unregister/:username', (req, res) => {
  User.findOne({ username: req.params.username }, (err, user) => {
    if(err) return res.sendStatus(404)

    console.log(user)
    
    user.checkPassword(req.query.password, async (err, same) => {
      if(err) return res.sendStatus(500)

      if(same) {
        await User.deleteOne({ _id: user._id }, err => {
          console.error(err)
          if(err) return res.sendStatus(500)

          return res.sendStatus(200)
        })
      }

      return res.sendStatus(401)
    })
  })
})

app.post('/api/users/authenticate', (req, res) => {
  User.findOne({ username: req.query.username }, (err, user) => {
    if(err) return res.sendStatus(404)

    console.log(user)
    
    user.checkPassword(req.query.password, (err, same) => {
      if(err) return res.sendStatus(500)

      delete user._doc.password

      if(same) return res.send(user)
      return res.sendStatus(401)
    })
  })
})

app.post('/api/workOrders/create', (req, res) => {
  let newWorkOrder = new WorkOrder({
    date: req.query.date,
    reference: req.query.reference,
    
    customerName: req.query.customerName,
    phoneNumber: req.query.phoneNumber,
    device: req.query.device,
    devicePassword: req.query.devicePassword,
    problem: req.query.problem,

    technician: req.query.technician,
    laborType: req.query.laborType,
    laborHours: req.query.laborHours,
    diagnosis: req.query.diagnosis,
    notes: req.query.notes,
    parts: req.query.parts
  })

  newWorkOrder.save((err) => {
    if(err) return res.sendStatus(400)
    return res.sendStatus(201)
  })
})

app.get('/api/workorders/get', (req, res) => {
  WorkOrder.find((err, result) => {
    if(err) return res.sendStatus(500)
    return res.send(result)
  })
})

app.get('/api/workorders/get/:id', (req, res) => {
  WorkOrder.findOne({ _id: req.params.id }, (err, workOrder) => {
    if(err) return res.sendStatus(400)

    return res.send(workOrder)
  })
})

app.put('/api/workorders/update/:id', (req, res) => {
  
  WorkOrder.findOne({ _id: req.params.id }, (err, workOrder) => {
    if(err) return res.sendStatus(400)

    workOrder.date = req.query.date || workOrder.date
    
    workOrder.customerName = req.query.customerName || workOrder.customerName
    workOrder.phoneNumber = req.query.phoneNumber || workOrder.phoneNumber
    workOrder.device = req.query.device || workOrder.device
    workOrder.devicePassword = req.query.devicePassword || workOrder.devicePassword
    workOrder.problem = req.query.problem || workOrder.problem

    workOrder.technician = req.query.technician || workOrder.technician
    workOrder.laborType = req.query.laborType || workOrder.laborType
    workOrder.laborHours = req.query.laborHours || workOrder.laborHours
    workOrder.diagnosis = req.query.diagnosis || workOrder.diagnosis
    workOrder.notes = req.query.notes || workOrder.notes
    workOrder.parts = req.query.parts || workOrder.parts

    WorkOrder.updateOne({ _id: req.params.id }, workOrder, (err, raw) => {
      if(err) { res.sendStatus(400); console.error(err); return }
      return res.sendStatus(200)
    })
  })

  
})

app.delete('/api/workorders/delete/:id', (req, res) => {
  WorkOrder.deleteOne({ _id: req.params.id }, (err) => {
    if(err) return res.sendStatus(400)
    return res.sendStatus(200)
  })
})

app.use(express.static(publicDirectoryPath));

app.get("*", (req, res) => {
  res.render("fourohfour");
});

app.post("*", (req, res) => {
  res.render("fourohfour");
});

app.listen(PORT);
console.log(`Server is listening on port ${PORT}`);