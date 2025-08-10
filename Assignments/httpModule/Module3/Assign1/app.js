const http = require('http');
const path = require('path');
const fs = require('fs');
const url = require('url');

const server = http.createServer((req,res)=>{
    if(req.url==="/"){
    const filePath = path.join(__dirname,'public','style.css');
    fs.readFile(filePath,'utf-8',(err,data)=>{
        if(!err){

           console.log(data);
           res.writeHead(200,{'content-type': 'text/css'})
           res.end(data);
        }
        else console.log("error occur");
    })
}
})

server.listen(3000,()=>{
    console.log("server started...");
})
