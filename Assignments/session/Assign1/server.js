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

app.post("/",(req,res)=>{
    const {username, password} = req.body;
    
const users = JSON.parse(fs.readFileSync(path.join(__dirname, "user.json")));

    const user = users.find(u=>u.username==username && u.password==password);

    if(!user) return res.send("<h3>Invalid credentials.<h3>")

        req.session.user={
            username: user.username,
            role:user.role,
            loginTime: new Date().toISOString()
        };

        if(user.role=="admin"){
            res.redirect("/admin");
        }
        else{
            res.redirect("/user")
        }
})

function isAuthenticated(req,res,next){
    if(req.session.user) next();
    else res.redirect("/");
}

app.get('/admin',isAuthenticated,(req,res)=>{
    if(req.session.user.role!=="admin"){
        return res.send("Access denied!");
    }
    res.sendFile(path.join(__dirname,"pages/admin.html"));
})
app.get('/user',isAuthenticated,(req,res)=>{
    if(req.session.user.role!=="user"){
        return res.send("Access denied!");
    }
    res.sendFile(path.join(__dirname,"pages/user.html"));
})
app.get('/',(req,res)=>{
    return res.sendFile(path.join(__dirname,"pages/auth.html"));
})
app.post("/logout",(req,res)=>{
    req.session.destroy();
    res.redirect('/');
})

app.listen(3000,()=>{
    console.log("server started...")
})