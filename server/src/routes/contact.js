const express = require('express')
router = express.Router()
const {addNewContact ,getAllContacts }  = require('../controllers/contact')

router.post('/contacts', addNewContact)
router.get('/contacts', getAllContacts)

module.exports = router