const express = require('express')
const router = express.Router()
const mysql = require ('mysql')
const { ErrorHandler } = require('../controllers/error')
const db = require('../controllers/database')



router.get('/campaign/:campaign_id',async (req,res)=>{
    await db.campaign.queryID({campaign_id : req.params.campaign_id},(err,resu)=>{
        if(err) return next(new ErrorHandler(500,err.message));
        res.status(200).json(resu);
        })
    
})
module.exports = router;
