const http = require('http');
const url = require('url');

const server = http.createServer((req,res)=>{
    try{
    if(req.url.startsWith('/greet')){
        const parsedUrl = url.parse(req.url,true);
        const name = parsedUrl.query.name;
        console.log(name);
        res.end(`Hello, ${name}`);
    }
    else{
        res.writeHead(404,{'content-Type' : 'text/plain'});
        res.end("Not found");
    }
} catch(err){
    console.log("error occur");
    res.end("error");
}
})

server.listen(5000,()=>{
    console.log("server started");
})