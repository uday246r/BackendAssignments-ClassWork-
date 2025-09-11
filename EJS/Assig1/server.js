const ejs = require('ejs');
const express = require('express');
const app = express();

app.set("view engine", "ejs")
app.set("views", __dirname)

app.get("/greetings",(req,res)=>{
    const userData = {username: "uday", isLoggedIn: "false"};

    res.render("greeting",{greetings: userData.isLoggedIn==="true" ? userData.username : "" })
    
})


app.listen(3000,()=>{
    console.log("server started...");
});