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
         db.query('DELETE  FROM'+process.env.DATABASE_USER_TABLE+' WHERE user_id = '+ params.user_id,(err,resu)=>{
            callback(err,resu);
         }); 

    }
}

var campaign = {
    queryID (params,callback){
        db.query("SELECT * FROM "+ process.env.DATABASE_CAMPAIGN_TABLE+" WHERE id_campaign =  ?" ,[params.campaign_id], async (err,resu)=>{
            callback(err,resu)
        })
    }
    ,

    insert(params,callback){
        let campaignObj ={
            id_brand : params.id_brand,
            begin_date : params.begin_date,
            end_date : params.end_date,
            status : 1 ,
            creation_date : new Date().getDate(),
            //optional:
            nbr_like : params.nbr_like,
            nbr_share : params.nbr_share,
            nbr_comment: params.nbr_comment,
            price_like : params.price_like,
            price_comment : params.price_comment,
            price_share : params.price_share,
            comment : params.comment,
        }
        db.query('INSERT into '+process.env.DATABASE_CAMPAIGN_TABLE+' SET ?',campaignObj,(err)=>{
        callback(err,campaignObj);
    })
    }
    ,
    delete(params,callback){
        db.query('DELETE  FROM '+process.env.DATABASE_CAMPAIGN_TABLE+' WHERE id_campaign = '+ params,(err,resu)=>{
            console.log(err);
            callback(err,resu);
         }); 

    }
    ,
    update(params,id_campaign,callback){
        console.log(id_campaign);
        db.query('UPDATE '+process.env.DATABASE_CAMPAIGN_TABLE+' SET nbr_like = 1   WHERE id_campaign = ?',[id_campaign],(err,resu)=>{
            console.log(resu);
            callback(err,resu);
        });
    }
}


var contact = {

    getContact(contact_id,callback){
        db.query('SELECT * FROM '+ process.env.DATABASE_CONTACT_TABLE+' WHERE compaign_id  = ? ',[contact_id],(err,resu)=>{
            callback(err,resu);
        })
    }
    ,
    insertContact(params,callback){
        db.query('INSERT INTO '+ process.env.DATABASE_CONTACT_TABLE+' SET ? ',params, (err,resu)=>{
            callback(err,resu);
        })
    }
    ,
    delete(contact_id, callback){
        db.query('DELETE  FROM '+process.env.DATABASE_CONTACT_TABLE+' WHERE contact_id = '+ contact_id,(err,resu)=>{
            callback(err,resu);
         }); 
    }
    ,
    update(contact_id,params,callback){
        db.query('UPDATE '+process.env.DATABASE_CONTACT_TABLE+' SET ? WHERE contact_id = ? ',[params,contact_id] ,(err,resu)=>{
            callback(err,resu)
        });
    }
}
module.exports = {
    campaign,
    profile,
    user,
    contact,
}
