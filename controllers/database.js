const mysql = require('mysql');
const bcrypt = require('bcrypt')
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



var user = {
    queryEmail(params,callback){
         db.query("SELECT * FROM "+ process.env.DATABASE_USER_TABLE+" WHERE email =  ?" ,[params.email], async (err,resu)=>{
            callback(err,resu[0])
        })
    }
    ,
    insert (params,callback){
         db.query('INSERT into '+process.env.DATABASE_USER_TABLE+' SET ?', {
                first_name : params.first_name,
                last_name : params.last_name ,
                email : params.email , 
                brand_name : params.brand_name ,
                birthdate :  params.birthdate ,
                user_password :  bcrypt.hashSync(params.user_password,12) ,                                
                user_cin : params.user_cin ,
                num_societe : params.num_societe,
                user_role : params.user_role ,
                user_bio : params.user_bio,
                user_gender : params.user_gender,
                phone_number : params.phone_number ,
                creation_date : params.creation_date,

        },(err,resu)=>{
            callback(err,resu)
        })


    }

}


var profile = {
    queryId (params,callback){
         db.query('SELECT * FROM '+process.env.DATABASE_USER_TABLE+' WHERE user_id = ? ',params.user_id,(err,resu)=>{
            callback(err,resu[0]);
        })
    }
    ,
    queryAttribute(params,callback){
         db.query('SELECT '+params.attribute+' FROM '+process.env.DATABASE_USER_TABLE+' WHERE user_id = ? ',params.user_id,(err,resu)=>{
            callback(err,resu[0]);
        })
    } 
    ,
    updateAttribute(params,callback){
         db.query('UPDATE '+process.env.DATABASE_USER_TABLE+' SET '+ params.attribute +'= "' + params.value +'" WHERE user_id = '+ params.user_id,(err,resu)=>{
            callback(err,resu)
        });

    }
    ,
    deleteProfile(params,callback){
         db.query('DELETE  '+process.env.DATABASE_USER_TABLE+' WHERE user_id = '+ params.user_id,(err,resu)=>{
            callback(err,resu);
         }); 

    }
}

var campaign = {
    queryID (params,callback){
        db.query("SELECT * FROM "+ process.env.DATABASE_CAMPAIGN_TABLE+" WHERE email =  ?" ,[params.campaign_id], async (err,resu)=>{
            callback(err,resu[0])
        })
    }
}
module.exports = {
    campaign,
    profile,
    user,
}
