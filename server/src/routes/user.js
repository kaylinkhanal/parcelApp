const express = require('express')
router = express.Router()
const {registerNewUser,loginUser,getAllUsers, changePassword,}  = require('../controllers/user')
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next)=>{
    try{
        const token = req.headers?.authorization?.split(' ')?.[1]
        const isVerified = jwt.verify(token, '3ff389373984aed2fe10f6708d52df49548e45646bc350dc8b630ad90ca96b925205debdb4688e148c10b7ce8751c84d5de441b56304fdce3a60809f7d8010ec');
        if(isVerified){
            next()
        }
    }catch(err){
        res.status(403).send('un-authorized')
    }
}
router.post('/register', registerNewUser)
router.post('/login', loginUser)

router.get('/users',verifyToken, getAllUsers)
router.post('/change-password/:id',verifyToken,changePassword)
module.exports = router