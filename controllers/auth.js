
require('dotenv').config({path: "./.env"})
const jwt = require ('jsonwebtoken')
const { ErrorHandler } = require('./error')






    //TOKEN VERIF
function authentificateToken (req,res,next) {

    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(!token) return next(new ErrorHandler(401,"INVALID_TOKEN"))

    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,decoded)=>{
        if(err) return res.sendStatus(403)
        if(!decoded) return next(new ErrorHandler(401,"INVALID_TOKEN"))
        req.body.user_id = decoded.user_id;
        req.body.user_role = decoded.user_role;

        next()
    })
}




module.exports = {
    authentificateToken,

}
