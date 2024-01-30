const express = require('express')
router = express.Router()
const {addNewContact,getContactsById}  = require('../controllers/contacts')

router.post('/contacts', addNewContact)
router.get('/contacts', getContactsById)


module.exports = router