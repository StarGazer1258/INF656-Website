const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://localhost:27017'
const databaseName = 'ezworkorders'

const id = new ObjectID()
console.log(id)
console.log(id.getTimestamp())

MongoClient.connect(connectionURL, { useUnifiedTopology: true }, (err, client) => {
  if(err) return console.log("Unable to connect to database!")

  console.log('Connected to database successfully!')
  
    const db = client.db(databaseName)

    // Insert a single document
    db.collection('users').insertOne({
      name: 'Nathan',
      age: 22
    }, (err, res) => {
      if(err) return console.log('Failed to insert document.')
      console.log(res.ops)
    })

    // Insert multiple documents
    db.collection('users').insertMany([
      {
        name: 'Nathan',
        age: 22
      },
      {
        name: 'Shianne',
        age: 21
      }
    ], (err, res) => {
      if(err) return console.log('Failed to insert documents.')
      console.log(res.ops)
    })

    // Fetch first matching document
    db.collection('users').findOne(
      {
        name: 'Nathan',
        age: 22
      }, (err, res) => {
        if(err) return console.log('Failed to find document.')
      console.log(res)
      }
    )

    // Fetch all matching documents and count them
    db.collection('users').find(
      {
        age: 22
      }, (err, res) => {
        if(err) return console.log('Failed to find document.')
      console.log(res)
      }
    ).count((err, count) => {
      console.log(count)
    })

    client.close()
})
