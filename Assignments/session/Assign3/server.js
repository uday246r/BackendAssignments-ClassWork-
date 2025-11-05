const express = require('express');
const app = express();
const session= require('express-session');
const fs = require('fs');
const path = require('path');
app.use(express.urlencoded({ extended: true }));


app.use(session({
    secret: "RadheShyam",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30*60*1000 },
    rolling: true
}))

function isAuthenticated(req,res,next){
    if(req.session.user) next();
    else res.redirect('/');
}
function isTimeout(req,res,next){
    if (!req.session.user) return res.redirect('/');

const lastLoginTime = new Date(req.session.user.loginTime).getTime();
    const currentTime = Date.now();

    if(currentTime-lastLoginTime<30*60*1000){
        req.session.user.loginTime = currentTime;
        return next();
    }
    req.session.destroy(()=>{
    res.redirect("/");
    });
}
app.post("/",(req,res)=>{
    const {username, password} = req.body;
    const users = JSON.parse(fs.readFileSync(path.join(__dirname,"user.json")));
    const user = users.find(u=>u.username==username && u.password==password);
        if(!user){
            return res.send("<h3>Access denied!</h3>")
        }
        req.session.user={
            username: user.username,
            role: user.role,
            loginTime: new Date().toISOString()
        }
        res.redirect("/profile");
})
app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"pages/login.html"));
})

app.get("/profile",isTimeout,isAuthenticated,(req,res)=>{
    res.sendFile(path.join(__dirname,"pages/profile.html"));
})

app.listen(3000,()=>{
    console.log("server started...");
})