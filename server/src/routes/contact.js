const express = require('express')
router = express.Router()
const {addNewContact,getContactsById,editContactById,getContactDetailsById}  = require('../controllers/contacts')

router.post('/contacts', addNewContact)
router.put('/contacts', editContactById)
router.get('/contacts', getContactsById)
router.get('/contacts/:id',getContactDetailsById)


module.exports = router