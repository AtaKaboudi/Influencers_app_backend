const express =require ('express')
const router = express.Router() 
const jwt = require ('jsonwebtoken')
const {check ,validationResult} = require ('express-validator/check')
const bcrypt = require('bcrypt')
const db = require('../controllers/database')
const { ErrorHandler } = require('../controllers/error.js')




router.post('/register',[check('email').isEmail()],  async (req,res,next)=>{

    const errors = validationResult(req);
    if(!errors.isEmpty()) return next(new ErrorHandler(403,"INVALID_ARGUMENT_FORMAT"))
    

   await db.user.queryEmail(req.body, async (err,resu)=>{
    
        if(err) return next(new ErrorHandler(500,err.message));
        if(resu.length > 0) return next(new ErrorHandler(401,'EMAIL_TAKEN'))


               await db.user.insert(req.body, (err,resu)=>{
                    if(err) next(new Error(500,err.message))
                    else res.status(200).send({"status":"success","message" : "Succesfful Registry"});
                })       
    })

})







router.post('/login',[check('email').isEmail()], async (req,res,next)=>{

    const errors = validationResult(req);
    if(!errors.isEmpty()) return next(new ErrorHandler(422,"INVALID_ARGUMENT_FORMAT"))
      


        await db.user.queryEmail({email: req.body.email}, (err,resu)=>{

            if(err) return next(new ErrorHandler(500,err.message));
            if(!resu) return next(new ErrorHandler(403,'INVALID_EMAIL'))
            

            if(!bcrypt.compareSync( req.body.user_password,resu.user_password)) {
                return  next(new ErrorHandler(403,'INVALID_PASSWORD'))
            }
            const accessToken =  jwt.sign({ user_id :  resu.user_id, user_role : resu.user_role } , process.env.ACCESS_TOKEN_SECRET)
            res.status(201).json({"accessToken" : accessToken});

        })
})





module.exports  = router ;


