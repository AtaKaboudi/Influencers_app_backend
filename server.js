

const express = require ('express')
const app = express()


app.use(express.json())

app.use(express.json())


//JSON access
app.use (express.urlencoded({extended: false}))

//Define Routes 
app.use('/auth',require('./routes/auth.js'));






app.get('/test',(req,res)=>{
    console.log(req.user);
})







app.listen(process.env.PORT);
