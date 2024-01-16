const express = require('express')
const registerNewUser = require('../controllers/user')
router = express.Router()
router.post('/register', registerNewUser)
module.exports = router