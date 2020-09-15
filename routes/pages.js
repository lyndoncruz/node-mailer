const express = require('express')

const router = express.Router()
const contactsController = require('../controllers/contactLists')
const sentItemsController = require('../controllers/sentItems')

router.get("/",(req,res) => {
    res.render("index")
})

router.get("/contacts",contactsController.contactlist)

router.get("/sentItems",sentItemsController.sentItems)

module.exports = router