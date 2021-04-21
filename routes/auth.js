require('dotenv').config({path: "./.env"})

const express =require ('express')
const router = express.Router() 
const mysql = require('mysql')
const jwt = require ('jsonwebtoken')
const authController = require('../controllers/auth.js')
require('dotenv').config({path: "../.env"})
const {check ,validationResult} = require ('express-validator/check')
const bcrypt = require('bcrypt')

//connect to database 
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



router.post('/register',[check('email').isEmail()],  async (req,res)=>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.json({'error': "INVALID_EMAIL_TYPE"})
        return;
    }

    const {first_name,last_name,brand_name,email,birthdate,user_password,user_cin,num_societe,user_role,user_bio,user_gender,phone_number,creation_date} = req.body; 
  
  

   

   await db.query("SELECT * FROM "+ process.env.DATABASE_USER_TABLE+" WHERE email =  ?" ,[email], async (err,resu)=>{
    
        if(err) {
            res.json({'error': err});
            return ;
    }

    if(resu.length > 0){
         return   res.json({'error' : "Email taken"});
    }



               await db.query('INSERT into '+process.env.DATABASE_USER_TABLE+' SET ?', {
                    //// ADD ID GENERATOR IF EXISTS
                        first_name : first_name,
                        last_name : last_name ,
                        email : email , 
                        brand_name :brand_name ,
                        birthdate : birthdate ,
                        user_password :  bcrypt.hashSync(user_password,12) ,                                   //add hash code
                        user_cin : user_cin ,
                        num_societe : num_societe,
                        user_role : user_role ,
                        user_bio : user_bio,
                        user_gender : user_gender,
                        phone_number : phone_number ,
                        creation_date : creation_date,

                },(err,resu)=>{
                    if(err) return  res.json({'error': err});
                    else res.send("Succesfful Registry");
                })

                
    })

})







router.post('/login',[check('email').isEmail()], async (req,res)=>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.json({'error': "INVALID_EMAIL_TYPE"})
        return;
    }


        let {email , user_password}= req.body ;
        await db.query('SELECT * FROM '+process.env.DATABASE_USER_TABLE+' WHERE email =  ?', [email], async (err,resu)=>{
            if(err){
              return  res.json({'error': err});
            }
            if(resu.length == 0 ){
                return res.json( {'error': "Email not found"})
            }

            if(!bcrypt.compareSync( user_password,resu[0].user_password)) {
                res.json({"error":"PASSWORD_NOT_FOUND"})
                return;
            }
            
            const accessToken =  jwt.sign({user_id : resu.user_id} , process.env.ACCESS_TOKEN_SECRET)
            res.json({accessToken : accessToken});

        })

   
})





module.exports  = router ;


