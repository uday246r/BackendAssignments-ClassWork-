const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

const SECRET_KEY = "mySecret123";

app.get('/',async(req,res)=>{
    res.sendFile(path.join(__dirname,"/login.html"));
})

app.post("/login", async(req,res)=>{
    const data = req.body;
    let arr = [];

    fs.readFile(path.join(__dirname,"user.json"),"utf-8",(err,fileData)=>{
        
        if(!err){
            try{
                arr = JSON.parse(fileData);
            }
            catch(e){
                arr = [];
            }
        
        const user = arr.find(
      (e) => e.username === data.username && e.password === data.password
    );

    if (!user) {
      return res.status(401).send('Invalid username or password');
    }

    const token = jwt.sign(
        {
            username: user.username,
            role: user.role,
            loginTime: new Date().toISOString(),
    },
    SECRET_KEY,
    {expiresIn: '1h'}
);

res.cookie('token',token,{httpOnly:true});

    if (user.role === 'admin') {
      return res.redirect('/admin');
    } else if (user.role === 'user') {
      return res.redirect('/user');
    } else {
      return res.status(400).send('Invalid role');
    }
}
else{
    console.log("error occur");
    return res.status(500).send("Internal Server Error");

}
    })


})

function verifyToken(req,res,next){
    const token = req.cookies.token;
    if(!token) return res.status(401).send("Access Denied");

    jwt.verify(token, SECRET_KEY, (err, decoded)=>{
        if(err) return res.status(403).send("Invalid token");
        req.user = decoded;
        next();
    });
}

app.get('/admin', verifyToken,(req,res)=>{
    if(req.user.role!= "admin"){
        return res.status(403).send("Access denied");
    }
    res.sendFile(path.join(__dirname,'admin.html'));
});

app.get('/user', verifyToken,(req,res)=>{
    if(req.user.role!= "user"){
        return res.status(403).send("Access denied");
    }
    res.sendFile(path.join(__dirname,'user.html'));
});

app.listen(3000,()=>{
    console.log("server started...");
})