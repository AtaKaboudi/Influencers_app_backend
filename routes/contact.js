const express = require('express');
const router = express.Router();
const db = require('../controllers/database');
const { ErrorHandler } = require('../controllers/error');

router.get('/contact/:contact_id',async (req,res,next)=>{

   await db.contact.getContact(req.params.contact_id,(err,resu)=>{
        if(err) return next(new ErrorHandler(500,err.message));
        res.status(200).send(resu);
    })
})

router.post('/contact',async (req,res,next)=>{

    delete req.body.user_id;
    delete req.body.user_role;
       await db.contact.insertContact(req.body,(err,resu)=>{
        if(err) return next(new ErrorHandler(500,err.message))
        res.status(200).send(resu);
    })
})


router.delete('/contact/:contact_id',async (req,res,next)=>{
    await db.contact.delete(req.params.contact_id,(err,resu)=>{
        if(err) return next(new ErrorHandler(500,err.message));
        res.status(200).json({"status" :"success", "message":"successful delete"});
    }); 
})

router.put('/contact/',async (req,res,next)=>{
    let contact_id = req.body.contact_id;
    delete req.body.user_role;
    delete req.body.user_id;
    delete req.body.contact_id;

    await db.contact.update(contact_id,req.body,(err,resu)=>{
        if(err) return next(new ErrorHandler(500,err.message));
        res.status(200).json({"status" :"success", "message":"successful updated"});
    }); 
})



module.exports = router;