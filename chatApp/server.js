const express = require("express")
const http = require("http") // 1
const path = require("path")
const fs = require('fs')
const {Server}  = require("socket.io") //3
const app = express()

const server = http.createServer(app) //2

const io = new Server(server)// 4



// app.use(express.static("public"))
// app.use(express.json())
let messages = []
let users=[]

// 6
io.on("connection", (socket)=>{
    console.log("socket connected...")

    // io.emit("notify", socket.id + "new user connected")
    socket.emit("getAllMessages", {messages});
    socket.emit("getAllUsers", { users });

    socket.on("joinUser",(userName)=>{
         if (userName && !users.some((u) => u.name === userName)) {
      users.push({ id: socket.id, name: userName });
      io.emit("getAllUsers", { users });

      socket.emit("notify", "You have joined the chat");
      socket.broadcast.emit("notify", `${userName} joined the chat`);
      console.log(`${userName} joined`);
    }
    })

    socket.on("sendMessage", (data)=>{
        messages.push(data)
        io.emit("getAllMessages", {messages})
    })

    socket.on("leaveUser",(userName)=>{
        users = users.filter((u) => u.name !== userName);
    io.emit("getAllUsers", { users });
    io.emit("notify", `${userName} left the chat`);
    console.log(`${userName} left manually`);
    })

    socket.on("disconnect",()=>{
    const leftUser = users.find((u) => u.id === socket.id);
  if (leftUser) {
    users = users.filter((u) => u.id !== socket.id);
    io.emit("getAllUsers", { users });
    io.emit("notify", `${leftUser.name} left the chat`);
  }
})

})



// app.post("/sendMessage", (req, res)=>{
//     messages.push(req.body.message)
//     res.json(req.body)
// })

// app.get("/getAllMessages", (req, res)=>{
//     res.json(messages)
// })

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"public","login.html"));
})

app.get("/chat", (req, res) => {
    // const user = req.query.user;
    // if(user && !users.some(u=>u.name==user)){
    // users.push({id:Date.now(),name:user});
    // }
//     let fileUser = [];
//     fs.readFile("user.json","utf-8",(err,data)=>{
//         if(!err && data){
//             try{
//             fileUser=JSON.parse(data);
//             }
//             catch(e){
//                 fileUser=[];
//             }
//         }
//         if(user && !fileUser.some(u=>u.name==user)){
//             fileUser.push({id:Date.now(), name: user});
//          fs.writeFile("user.json",JSON.stringify(fileUser),(err)=>{
//         if(!err) console.log("New user join the chat");
//     });
// }
    // users = fileUser;
    // })
    res.sendFile(path.join(__dirname, "index.html"));
});



// 5
server.listen(5000, ()=>{
    console.log("server started...")
})