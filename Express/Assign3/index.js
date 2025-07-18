const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname,'public')));

app.get('/home',(req,res)=>{
    res.sendFile(path.join(__dirname,'public','home.html'))
})

app.listen(3000,()=>{
console.log("server started..")
})