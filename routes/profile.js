const { Router } = require('express')
const express =require ('express')
const router = express.Router() 
require('dotenv').config({path: "./.env"})
const mysql  =require ('mysql')
const auth = require ('../controllers/auth')
const { ErrorHandler } = require('../controllers/error')
const db = require('../controllers/database')



router.get('/profile', async (req,res,next)=>{
    if(!req.body.user_id) return next(new ErrorHandler(400,"INVALID_ARGUMENT_FORMAT"))

   await db.profile.queryId ({user_id: req.body.user_id},(err,resu)=>{
       if(err) return next(new ErrorHandler(500,err.message));
        res.status(200).json(resu);
    })

})



router.get('/profile/:attribute', async (req,res,next)=>{

    await db.profile.queryAttribute({user_id: req.body.user_id,attribute : req.params.attribute},(err,resu)=>{
        if(err) return next(new ErrorHandler(500,err.message));
         res.status(200).json(resu);
     })


})


router.put('/profile/:attribute',async (req,res,next)=>{
    console.log(req.body);
    if(!req.body.value) return next(new ErrorHandler(400,"INVALID_ARGUMETN_FORMAT"));
    
    req.body.attribute = req.params.attribute;
    await db.profile.updateAttribute(req.body,(err,resu)=>{
        if(err) return next(new ErrorHandler(500,err.message));
        res.status(200).json({"status" :"success", "message":"successful update"});
    });

})

router.delete('/profile',async (req,res,next)=>{
    await db.profile.deleteProfile(req.body,(err,resu)=>{
        if(err) return next(new ErrorHandler(500,err.message));
        res.status(200).json({"status" :"success", "message":"successful delete"});
    }); 
})




module.exports  =router ;

