const { Router } = require('express')
const express =require ('express')
const router = express.Router() 
require('dotenv').config({path: "./.env"})
const db = require('../controllers/database')





router.get('/getAll', async (req,res)=>{
   await db.query('SELECT * FROM '+process.env.DATABASE_USER_TABLE+' WHERE user_id = ? ',req.body.user_id,(err,resu)=>{
       if(err) return res.send(err)
       if(resu.length != 1) return res.send("CHECK ID")
        res.json(resu);
    } )
    console.log('[Profile] GET ALL '+ req.body.user_id)

})

/*
    getAttribute : 
    body : { 
        user_id : 1 , 
        attribute : first_name
    }
*/

router.get('/getAttribute/', async (req,res)=>{

    await db.query('SELECT '+req.body.attribute+' FROM '+process.env.DATABASE_USER_TABLE+' WHERE user_id = ? ',req.body.user_id,(err,resu)=>{
        if(err) return res.json({"error": err})
        if(resu.length != 1) return res.send("CHECK ID")
         res.json(resu);
     } )

     console.log('[Profile] GET '+ req.body.attribute +' '+ req.body.user_id)

})


 /* modify  : 
    
post  https : ..... /modify/firstname 
    Req body : {user_id : 1=2 , new_value : "ata"}

 */
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

