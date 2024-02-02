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

const changePassword = async(req,res)=>{
    const user= await User.findById(req.params.id)
    const match = await bcrypt.compare(req.body.oldPassword, user.password);
    if(match){

    }else{

    }
// 1. oldPassword  =====> db password check 

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
            res.json({
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
module.exports= {registerNewUser,loginUser,getAllUsers,changePassword}