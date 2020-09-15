const contactsController = require('./contactLists')
const contactmysqlConnect= require('../mysql/mysql')
const db = contactmysqlConnect.mysqlconnect()
exports.sentItems =  (req, res) =>{
    db.query('SELECT toEmail,subject,status FROM sentMessages',(error,results) => {
        if(error){
            console.log(error)
        }else{
            res.render("messages",{
                messageLists:results
            })
        }
    }) 
}
