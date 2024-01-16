const express = require('express')
const connection = require('./db/connection')
const app = express()
app.use(express.json())
require('dotenv').config()
const userRoute = require('./routes/user')
const port = process.env.PORT
const User = require('./models/user')

connection()

app.post('/register', (req, res) => {
    User.create(req.body)
    res.send({ msg: "user registered successfully" })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

