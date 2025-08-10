const http = require('http');

const server = http.createServer((req,res)=>{
    if(req.url==='/data.html'){
        res.writeHead(200,{'content-Type': 'text/html'});
        res.end("<h1>Radhe Radhe</h1><p>radhe radhe</p>");
    }
    else if(req.url==='/data.json'){
        res.writeHead(200,{'content-Type': 'application/json'});
        res.end(JSON.stringify({message: "RadhaVallabh", status: "success"}));
    }
    else if(req.url==='/data.txt'){
        res.writeHead(200,{'content-Type': 'text/plain'});
        res.end("Radhe Shyam");
    }
    else{
        res.writeHead(200,{'content-Type': 'text/plain'});
        res.end("404 - Not Found");
    }
});

server.listen(4000,()=>{
    console.log("server stsrted..");
})