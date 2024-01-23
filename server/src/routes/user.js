const express = require('express')
router = express.Router()
const {registerNewUser,loginUser,getAllUsers}  = require('../controllers/user')

router.post('/register', registerNewUser)
router.post('/login', loginUser)
router.get('/users',getAllUsers)
module.exports = router