const Contact = require('../models/contact')

const addNewContact = async(req,res)=>{
    await Contact.create(req.body)
    return res.json({msg: 'contact created'})
}


const getAllContacts =async(req,res)=>{
  const contactList =  await Contact.find({userId: req.query.userId})
  res.json({contactList})
}



module.exports= {addNewContact,getAllContacts}