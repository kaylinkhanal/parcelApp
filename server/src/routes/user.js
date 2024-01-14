const express = require('express')
router = express.Router()
const registerNewUser  = require('../controllers/user')

router.get('/register', registerNewUser)
module.exports = router