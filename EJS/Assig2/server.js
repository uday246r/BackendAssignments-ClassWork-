const express = require('express')
const ejs = require('ejs')
const fs = require('fs')

const app = express()
app.use(express.json());



app.set("view engine", "ejs")
app.set("views", __dirname)



app.get("/", (req, res)=>{
    res.render("main",{error: ""})
})


app.listen(3000, ()=>{
    console.log('server started..')
})