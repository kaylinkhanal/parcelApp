const Contact = require('../models/contact')

const getContactsById = async(req,res)=>{
   const contactList = await Contact.find({userId: req.query.userId})
   return res.json({contactList})
}

const addNewContact = async(req,res)=>{
   await Contact.create(req.body)
   res.json({msg: 'User created successfully'})
}

module.exports= {addNewContact,getContactsById}