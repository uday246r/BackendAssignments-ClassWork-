const express = require('express')
const ejs = require('ejs')
const fs = require('fs')

const app = express()
app.use(express.json());

app.use(express.urlencoded())

// let users = [
//     {
//         username: "h@g.com",
//         password: "1234"
//     },
//     {
//         username: "e@g.com",
//         password: "1234"
//     }
// ]

app.set("view engine", "ejs")
app.set("views", __dirname + "/views")

// let list = ["1", "2", "3"]

// app.get("/", (req, res)=>{

    // res.render("test", 
    //     {
    //         name: "<h1>chitkara</h1>", 
    //         listItem : list,
    //         var1: true,
    //     })



    // let listItem = list.map(elem => `<li>${elem}</li>`).join(" ")
    // console.log(listItem)
    // let html = `
    //     <ul>
    //         ${listItem}
    //     </ul>
    // `

    // res.send(html)
    // res.sendFile(__dirname + "/index.html")
// })

// app.get("/data", (req, res)=>{
//     res.json({message: "hello world"})
// })




app.get("/", (req, res)=>{
    res.render("login",{error: ""})
})

app.post("/login", (req, res)=>{
    fs.readFile('userDetails.json',"utf-8",(err,data)=>{
        if(err){
            console.log("Error occured");
            res.render("login",{error: "Error occured"})
        }
        let users = [];
        if(data.length!=0){
            users = JSON.parse(data);
        }
    let userFound = users.find((u)=> u.username == req.body.username)
    if(!userFound){
        res.render("login", {error: "user not found"})
    }else{
        if(userFound.password != req.body.password){
            res.render("login", {error: "invalid password"})
        }else{
            res.render("home",{user: userFound.username})
        }
    }
        })
})

app.get("/signup",(req,res)=>{
    res.render("signup",{Serror: ""});
})
app.post("/signup", (req,res)=>{
    let userData = req.body;

    fs.readFile("userDetails.json","utf-8",(err,data)=>{
        if(err){
            console.log("Error occured");
            res.render("signup",{Serror: "Error occured in file reading"});
        }
            let arr = [];

if(data.length!=0){
arr = JSON.parse(data);
}
arr.push(userData);
    fs.writeFile("userDetails.json",JSON.stringify(arr),(err)=>{
        if(!err){
            console.log("data saved...");
            res.render("login",{error: ""});
        }
        else{
            console.log("Error occured");
            res.render("signup",{Serror: "Error occured"});
        }
    })
            
    })
})

app.listen(3000, ()=>{
    console.log('server started..')
})