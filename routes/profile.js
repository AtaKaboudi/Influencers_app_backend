const { Router } = require('express')
const express =require ('express')
const router = express.Router() 
require('dotenv').config({path: "./.env"})
const mysql  =require ('mysql')
const auth = require ('../controllers/auth')

const db = mysql.createConnection({
    host : process.env.DATABASE_HOST,
    user : process.env.DATABASE_USER,
    password : process.env.DATABASE_PASSWORD ,
    database : process.env.DATABASE_NAME,     

})

db.connect((err)=>{
    const prompt = err ? err.code : "MYSQL Connected"
    console.log(prompt);
})



router.get('/getAll', async (req,res)=>{
    if(!req.body.user_id) return res.json({"error" : "WRONG_REQUEST_FORMAT"});

   await db.query('SELECT * FROM '+process.env.DATABASE_USER_TABLE+' WHERE user_id = ? ',req.body.user_id,(err,resu)=>{
       if(err) return res.send(err.code) 
       if(resu.length != 1) return res.send("CHECK ID")
        res.json(resu);
    } )
    console.log('[Profile] GET ALL id: '+ req.body.user_id)

})



router.get('/getAttributes/', async (req,res)=>{

    await db.query('SELECT '+req.body.attribute+' FROM '+process.env.DATABASE_USER_TABLE+' WHERE user_id = ? ',req.body.user_id,(err,resu)=>{
        if(err) return res.json({"error": err})
        if(resu.length != 1) return res.send("CHECK ID")
         res.json(resu);
     } )

     console.log('[Profile] GET '+ req.body.attribute +' '+ req.body.user_id)

})


router.post('/modify/:attribute',async (req,res)=>{
    let attributeToChange = req.params.attribute ;
    await db.query('UPDATE '+process.env.DATABASE_USER_TABLE+' SET '+ attributeToChange +'= "' + req.body.new_value +'" WHERE user_id = '+ req.body.user_id);
    console.log('[Profile] UPDATE '+ req.params.attribute+' '+ req.body.user_id)

})

router.post('/delete',async (req,res)=>{

   await db.query('DELETE '+process.env.DATABASE_USER_TABLE+' WHERE user_id = '+ req.body.user_id); 
    console.log('[Profile] DELETE '+ req.body.user_id)

})




module.exports  =router ;

