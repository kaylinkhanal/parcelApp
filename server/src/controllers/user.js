const User = require('../models/user')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const registerNewUser = async(req,res)=>{
    try{
        const existingUser = await User.findOne({phoneNumber: req.body.phoneNumber})
        if(existingUser){
            return res.status(403).json({
                msg: "phone number already exist"
            })
        }
        const hashPass = await bcrypt.hash(req.body.password, saltRounds )
        req.body.password = hashPass
        await User.create(req.body)
        res.json({
            msg: "registered successfully"
        })
    }catch(err){
        console.log(err)
    }
  
}
const getAllUsers = async(req,res)=>{
    const data = await User.find()
    res.json({data})
  
}

const loginUser = async(req,res)=>{
    try{
       const userDetails = await User.findOne({phoneNumber: req.body.phoneNumber})
       if(userDetails){
        const match = await bcrypt.compare(req.body.password, userDetails.password);
        
        if(match){
            const token = jwt.sign({ phoneNumber: req.body.phoneNumber }, 'shhhhh');
            res.json({
                userDetails,
                msg: 'Login success',
                token,
            })
        }else{
            res.status(403).json({
                msg: 'Incorrect password'
            })
        }
       }else{
        res.status(403).json({
            msg: 'Invalid phone number'
        })
       }
    }catch(err){
        console.log(err)
    }
  
}

const changePassword = async (req,res)=>{
try {

    const userId = req.params.id
    const {newPassword,oldPassword} = req.body
    //first check if userId exist
    const user = await User.findById(userId)
    if(!user){
        return res.status(404).json({
            msg:"Invalid user id"
        })
    }
    //check if db oldPass equalst to entered old pass
    const match = await bcrypt.compare(oldPassword, user.password);
    if(!match){
        return res.status(401).json({
            msg:"Old password is incorrect"
        })
    }
    // if everything is fine, hash the new pass and save to the db
    const hashPass = await bcrypt.hash(newPassword, saltRounds )
    user.password = hashPass
    await user.save()
    res.status(200).json({
        msg:"Password changed succesfully"
    })
} catch (error) {
    console.log(error)
}

}
module.exports= {registerNewUser,loginUser,getAllUsers,changePassword}