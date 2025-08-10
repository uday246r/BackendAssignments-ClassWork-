const http = require('http');
const url = require('url');
const fs = require('fs');
const querystring = require('querystring');

const server = http.createServer((req,res)=>{
    if(req.url==="/form" && req.method=="POST"){
        console.log("enter");
        let body = '';
        req.on('data',chunk=>{
            body += chunk.toString();
            console.log(body);
        })
        req.on('end',()=>{
            // console.log("enter for parsing")
            try{
            const parsed = querystring.parse(body);

            res.end(`Thank you, ${parsed.name}. Your email is ${parsed.email}`);
            } catch(err){
                console.log("error in parsing");
                res.end("Error occur");
            }
        })
    }
    else if(req.url=="/form" && req.method=="GET"){
        fs.readFile('./index.html','utf-8',(err,data)=>{
            if(!err){
                res.writeHead(200,{'contentType' : 'text/html'});
                res.write(data);
                res.end();
            }
        })
    }
})

server.listen(4000,()=>{
    console.log("server started...");
})