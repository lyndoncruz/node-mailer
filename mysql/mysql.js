const mysql = require("mysql")
//DB CONNECTION
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE

})
db.connect()
exports.mysqlconnect = (mydb)=>{
    return db
}

