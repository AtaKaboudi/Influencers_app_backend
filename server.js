

const express = require ('express')
const app = express()
const authController = require ('./controllers/auth.js')


app.use(express.json())

app.use(express.json())


//JSON access
app.use (express.urlencoded({extended: false}))

//Define Routes 
app.use('/auth',require('./routes/auth.js'));
app.use ('/profile',authController.authentificateToken ,require('./routes/profile.js'));






app.get('/test',(req,res)=>{
    console.log(req.user);
})







app.listen(process.env.PORT);
