const mysql = require("mysql")
//DB CONNECTION
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE

})
exports.mysqlconnect = (mydb)=>{
    db.connect( (error) =>{
        if(error){
            console.log(error)
        }else{
            console.log("MySql connected...")
        }
    })
    return db
}

