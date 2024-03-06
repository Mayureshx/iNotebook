const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors')//cd backend  ,   npm install cors
connectToMongo();

const app = express()
const port = 5000

//Used when we call api from browser , if don't use then get errors of browser
app.use(cors())

app.use(express.json());//Midlleware if u want to use request body(req.body) while hitting endpoints.

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

//Available Routes
app.use('/api/auth', require('./routes/auth'))// This is endpoints which we gonna use to get that perticular route response and importing module from folder->file i.e(auth.js)
app.use('/api/notes', require('./routes/notes'))//Use to separate logic where in future u will not have any heache to while updating code

app.listen(port, () => {
  console.log(`iNotebook backend listening at http://localhost:${port}`)
})

