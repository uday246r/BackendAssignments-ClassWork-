const http = require('http');
const url = require('url');
const fs = require('fs');

const server = http.createServer((req,res)=>{
    if(req.url.startsWith('/movies')){
        const parsedUrl = url.parse(req.url,true);

        fs.readFile('./movie.json','utf-8',(err,data)=>{
            if(!err){
                    const movies = JSON.parse(data);

                movies.forEach(item=>{
                    if(item.genre === "Action"){
                        console.log(item);
                    }
                })
            }
            else{
                console.log("error occured");
            }
            res.end("done");
            
        })
    }
})

server.listen(4000,()=>{
    console.log("server started...");
})