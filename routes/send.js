const express = require('express')
const sendController = require('../controllers/send')
const router = express.Router()

//send/message
router.post("/message",sendController.mailchecker)


module.exports = router