const express=require('express')

const bodyParser = require('body-parser')

const route=require('./routes/authRoute')

const questionRoute=require('./routes/questionRoutes')

const mongoose=require('mongoose')

const app=express()

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({extended:true}))

mongoose.connect("https://github.com/Akshu864/CometLabs_Assignment.git",{useNewUrlParser: true})

.then(()=>{
    console.log("mongodb is connected")
})
.catch(err => console.log(err))

app.use('/',route)
app.use('/',questionRoute)

app.listen(3000,()=>{
    console.log("server is listening on port 3000")
})