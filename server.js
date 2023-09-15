const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const path = require('path')

// const connectDB = require('./server/database/connection')//mongo db

const app = express()



dotenv.config({path:'config.env'})


app.use(morgan('tiny'))//log requests morgan

//mongoDB connection
// connectDB();



//parse request to body parser 
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());

//SET VIEW ENGINE
app.set('view engine','ejs')
//app.set('views',path.resolve(__dirname,'views/foldername')) 
// if the html file inside views folder we can use this method to access the file.

//loading assets
app.use('/css',express.static(path.resolve(__dirname,'assets/css')))
app.use('/img',express.static(path.resolve(__dirname,'assets/img')))
app.use('/js',express.static(path.resolve(__dirname,'assets/js')))

//load routers
app.use('/',require('./server/routes/router'))

const port = process.env.port || 5000
app.listen(port,()=>{
    console.log(`server is running on http://localhost:${port}`)
})

// http://localhost:4000
// http://localhost:5000