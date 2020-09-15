const contactsController = require('../controllers/contactLists')
const contactmysqlConnect= require('../mysql/mysql')
const db = contactmysqlConnect.mysqlconnect()
exports.contactlist =  (req, res) =>{
console.log("Display from db")
    db.query('SELECT name,email FROM contactLists',(error,results) => {
        if(error){
            console.log(error)
        }else{
            res.render("contacts",{
                contacts:results
            })
        }
    }) 
}
