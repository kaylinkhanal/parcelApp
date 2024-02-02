const express = require('express')
router = express.Router()
const {registerNewUser,loginUser,getAllUsers,changePassword}  = require('../controllers/user')

router.post('/register', registerNewUser)
router.post('/login', loginUser)
router.post('/change-password/:id', changePassword)
router.get('/users',getAllUsers)
module.exports = router