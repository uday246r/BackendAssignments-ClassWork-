const http = require("http")
const fs = require('fs')
const queryString = require('querystring')

const server = http.createServer((req,res)=>{
    if(req.url=="/submit" && req.method=="GET"){
        fs.readFile("./index.html",(err,data)=>{
            if(!err){
            res.writeHead(200,{'content-Type':'text/html'})
            res.write(data);
            res.end();
            }
        })
    }
            else if(req.url=="/submit" && req.method=="POST"){
                let body="";

                req.on('data',(chunk)=>{
                    body += chunk.toString();
                })

                req.on('end',()=>{
                    fs.readFile("./data.json","utf-8",(err,data)=>{
                       let arr;
                        if(data.length!=0){
                            arr=JSON.parse(data)
                        }
                        else{
                            arr=[]
                        }

                        arr.push(queryString.parse(body))
                        fs.writeFile('./data.json',JSON.stringify(arr),(err)=>{
                            if(!err){
                                res.end("Success")
                            }
                        })
                    })
                })

            }
        })
    
        server.listen(3000,()=>{
            console.log("server started......")
            })