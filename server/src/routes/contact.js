const express = require('express')
router = express.Router()
const {addNewContact,getContactsById,editContactById}  = require('../controllers/contacts')

router.post('/contacts', addNewContact)
router.put('/contacts', editContactById)
router.get('/contacts', getContactsById)


module.exports = router