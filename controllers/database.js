const mysql = require('mysql');
require('dotenv').config({path: "../.env"})

//connect to database 


const db = mysql.createConnection({
    host : process.env.DATABASE_HOST,
    user : process.env.DATABASE_USER,
    password : process.env.DATABASE_PASSWORD ,
    database : process.env.DATABASE_NAME,     

})
/*
db.connect((err)=>{
    const prompt = err ? err : "MYSQL Connected"
    console.log(prompt);
})
*/
module.exports.db = db ;
