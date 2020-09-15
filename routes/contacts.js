const express = require('express')
const contactsController = require('../controllers/contacts')
const router = express.Router()


//send/message
router.post("/contacts",contactsController.contactlist)


module.exports = router