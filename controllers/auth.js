require('dotenv').config()

// SQL Config and  Connection
const db = mysql.createConnection({
    host : process.env.DATABASE_HOST,
    user : process.env.DATABASE_USER,
    password : process.env.DATABASE_PASSWORD ,
    // check ENV
    database : 'bachto',                                               

})
db.connect((err)=>{
  const prompt = err ? err : "MYSQL Connected"
    console.log(prompt);
})





function checkUserExists (id) {

}








    //TOKEN VERIF

function authentificateToken (req,res,next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token == null ) return res.sendStatus(401)

    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
        if(err) return res.sendStatus(403)
        req.user = user 
        next()
    })
}



