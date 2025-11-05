const express = require('express');
const session = require('express-session');
const fs = require('fs');
const path = require('path');
const app = express();
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: "shreeRadhe",
    resave: false,
    saveUninitialized: false
}))

function isAuthenticated(req,res,next){
    if(req.session.user) next();
    else res.redirect('/');
}

app.post("/",(req,res)=>{
    const {username,password} = req.body;

    const users = JSON.parse(fs.readFileSync(path.join(__dirname,"user.json")));
    const user = users.find(u=>u.username==username && u.password==password);

    if(!user) return res.send("Access Denied");

    req.session.user={
        username: user.username,
        role: user.role,
        loginTime: new Date().toISOString()
    };

    if(user.role=="admin" || user.role=="user"){
        res.redirect("/profile");
    }
})

app.get('/profile',isAuthenticated,(req,res)=>{
    if(req.session.user.role!=="user" && req.session.user.role!=="admin"){
        return res.send("Access denied!");
    }
    res.sendFile(path.join(__dirname,"pages/profile.html"));
})

app.get("/api/profile",isAuthenticated,(req,res)=>{
    const user = req.session.user;
    const timeSinceLogin = Math.floor((Date.now()-new Date(user.loginTime)) / 1000);
    res.json({
        username: user.username,
        sessionID: req.sessionID,
        timeSinceLogin
    });
})
app.get('/',(req,res)=>{
    return res.sendFile(path.join(__dirname,"pages/login.html"));
})

app.listen(3000,()=>{
    console.log("server started...");
})