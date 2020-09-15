const contactmysqlConnect= require('../mysql/mysql')
const db = contactmysqlConnect.mysqlconnect()
const validator = require("email-validator")

exports.contactlist =  (req, res) =>{
    console.log(req.body)
    
    const {name, email} = req.body

    if(!name){
        return res.render('contacts',{
            name:name,
            alertmessage: 'Please Enter Name'
        })
    }
    else if(!validator.validate(email))
    {
        return res.render('contacts',{
            name:name,
            email:email,
            alertmessage: 'Invalid Email!'+ email
        })
    }
    else
    {
        db.query('SELECT email FROM contactLists WHERE email = ?', [email], (error,results) =>{
            if(error){
                console.log(error)
            }

            if(results.length > 0){
                return res.render('contacts',{
                    alertmessage: 'Email already saved'
                })
            }else{
                db.query('INSERT INTO contactLists SET ?', {name: name, email: email}, (error,results) =>{
                    if(error){
                        console.log(error)
                    }else{
                        //get all contacts
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
                })
                
            }
        })
    }
    
}