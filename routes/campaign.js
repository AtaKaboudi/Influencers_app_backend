const express = require('express')
const router = express.Router()
const mysql = require ('mysql')
const { ErrorHandler } = require('../controllers/error')
const db = require('../controllers/database')

//Correct Dates

router.get('/campaign/:campaign_id',async (req,res,next)=>{
    await db.campaign.queryID({campaign_id : req.params.campaign_id},(err,resu)=>{
        if(err) return next(new ErrorHandler(500,err.message));
        res.status(200).json(resu);
        })
})

router.post('/campaign', async (req,res,next)=>{
    if ((!req.body.id_brand) || (!req.body.begin_date) || (!req.body.end_date))next(new ErrorHandler(403,"INVALID_ARGUMENT_FORMAT"))
    await db.campaign.insert(req.body, (err,resu)=>{
        if(err) return next(new ErrorHandler(500,err.message));
        res.status(200).json(resu);
    })
})

router.delete('/campaign/:campaign_id', async (req,res,next)=>{
    await db.campaign.delete(req.params.campaign_id, (err,resu)=>{
        if(err) return next(new ErrorHandler(500,err.message));
        res.status(200).json({"status": "success","message": "succesfully deleted"});
    })
})
router.put('/campaign',async(req,res,next)=>{
    if(!req.body.id_campaign) next(new ErrorHandler(403,"INVALID_ARGUMENT_FORMAT"))
    let id_campaign = req.body.id_campaign;
    delete req.body.id_campaign;
    delete req.body.user_id;
    delete req.body.user_role;
    await db.campaign.update(req.body,id_campaign,(err,resu)=>{
        if(err) return next(new ErrorHandler(500,err.message));
        res.status(200).json({"status": "success","message": "succesfully updated"});
    })
})


/* insert campain 
id brand
begin date
end date
status 
*/

/*
 add influencer 
 status 
 negociting
 */


 /* accepted pending  */
module.exports = router;
