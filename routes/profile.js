const { Router } = require('express')
const express =require ('express')
const router = express.Router() 
require('dotenv').config({path: "./.env"})
const mysql = require('mysql')




const db = mysql.createConnection({
    host : process.env.DATABASE_HOST,
    user : process.env.DATABASE_USER,
    password : process.env.DATABASE_PASSWORD ,
    database : process.env.DATABASE_NAME,     

})

db.connect((err)=>{
  const prompt = err ? err : "MYSQL Connected"
    console.log(prompt);
})


router.get('',(req,res)=>{
    db.query('SELECT * FROM '+process.env.DATABASE_USER_TABLE+' where user_id = ? ',req.body.user_id,(err,resu)=>{
       if(err) return res.send(err)
       if(resu.length != 1) return res.send("CHECK ID")
        res.json(resu);
    } )

})
router.post('/modify/:attribute',(req,res)=>{
    let attributeToChange = req.params.attribute ;
   console.log(req.body.attributeToChange); 
   // db.query('UPDATE '+process.env.DATABASE_USER_TABLE+' SET '+ attributeToChange +' :' + req.body.attributeToChange)
})




module.exports  =router ;

