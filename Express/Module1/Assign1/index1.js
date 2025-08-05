const express = require('express');
const path = require('path');
const app = express();


app.get('/services',(req,res)=>{
    res.sendFile(path.join(__dirname,'pages','services.html'))
})

app.get('/contact',(req,res)=>{
    res.sendFile(path.join(__dirname,'pages','contact.html'))
})

app.get('/about',(req,res)=>{
    res.sendFile(path.join(__dirname,'pages','about.html'))
})


app.listen(3000,()=>{
    console.log("server started...");
});