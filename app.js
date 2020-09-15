const express = require("express")

const path = require("path")

const dotenv = require("dotenv")

dotenv.config({path: './.env'})

const app = express()

const contactmysqlConnect= require('./mysql/mysql')



const publicDirectory = path.join(__dirname, './public')
app.use(express.static(publicDirectory))

//Parse URLencoded bodies (sent by html forms)
app.use(express.urlencoded({extended: false}))

//Parse JSON Bodies (sent by API)
app.use(express.json())

//SET MAIN VIEW
app.set('view engine','hbs')



//Define Routes
app.use('/', require('./routes/pages'))
app.use('/send', require('./routes/send'))
app.use('/saveContacts', require('./routes/contacts'))

const db = contactmysqlConnect.mysqlconnect()


app.listen("5000", () => {
    console.log("Server Started on PORT 5000")
})