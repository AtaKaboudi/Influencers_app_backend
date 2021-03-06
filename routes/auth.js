require('dotenv').config({path: "./.env"})

const express =require ('express')
const router = express.Router() 
const mysql = require('mysql')
const jwt = require ('jsonwebtoken')
const authController = require('../controllers/auth.js')

// databse conenct 

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




router.post('/register',(req,res)=>{
       
    const {first_name,last_name,brand_name,email,birthdate,user_password,user_cin,num_societe,user_role,user_bio,user_gender,phone_number,creation_date}= req.body; 
   
 
    db.query("SELECT * FROM "+ process.env.DATABASE_USER_TABLE+" WHERE email =  ?" , email,(err,resu)=>{
    
        if(err) {
         console.log(err)
         return ;
    }

    if(resu.length > 0){
         return   res.send("Email taken");
    }

    

                db.query('INSERT into '+process.env.DATABASE_USER_TABLE+'SET ?', {
                    //// ADD ID GENERATOR IF EXISTS
                        first_name : first_name,
                        last_name : last_name ,
                        email : email , 
                        brand_name :brand_name ,
                        birthdate : birthdate ,
                        user_password : user_password  ,                                                                    //add hash code
                        user_cin : user_cin ,
                        num_societe : num_societe,
                        user_role : user_role ,
                        user_bio : user_bio,
                        user_gender : user_gender,
                        phone_number : phone_number ,
                        creation_date : creation_date,

                },(err,resu)=>{
                    if(err) return  console.log(err);
                    else res.send("Succesfful Registry");
                })

                
    })

})







router.post('/login',(req,res)=>{

        let {email , user_password}= req.body ;

        /// CHECK LOGIN ON EMAIL and PASSWOR ?
        db.query('SELECT * FROM '+process.env.DATABASE_USER_TABLE+' WHERE email =  ?', [email],(err,resu)=>{
            if(err){
              return  console.log(err)
            }
            if(resu.length == 0 ){
                return res.send(' Invalid Mail')
            }
            db.query('SELECT * FROM '+process.env.DATABASE_USER_TABLE+' WHERE user_password =  ?', [user_password],(err,resu)=>{
           
              if(err){
                  return console.log(err)
              }
              if(resu.length == 0){
                  return res.send('Check your Password');
              }
                
                const accessToken =  jwt.sign({user_id : resu.user_id} , process.env.ACCESS_TOKEN_SECRET)
            res.json({accessToken : accessToken});
            })




        })

   
})





module.exports  = router ;


