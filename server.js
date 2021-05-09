

const express = require ('express')
const app = express()
const authController = require ('./controllers/auth.js')
const bodyparser = require('body-parser');
const expressValidator = require ('express-validator');



//Body access
app.use (express.urlencoded({extended: false}))
app.use(express.json());

//Define Routes 
app.use('/auth',require('./routes/auth.js'));
app.use ('/profile',authController.authentificateToken ,require('./routes/profile.js'));
app.use ('/campaign',authController.authentificateToken ,require('./routes/campain.js'));










app.listen(process.env.PORT);


/*
retour function / rs.send json error
 vefification id  id in token 
creation de campgnie
POST GET DELETE
*/