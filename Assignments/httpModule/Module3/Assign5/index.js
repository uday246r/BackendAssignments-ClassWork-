const http = require('http');

const server =http.createServer((req,res)=>{
    if(req.url==='/time-check'){
        const currentHour = new Date().getHours();
        if(currentHour<12){
            res.writeHead(302,{Location: '/morning'});
            res.end();
        }
        else{
            res.writeHead(302,{Location: '/evening'});
            res.end();
        }
    }
    else if(req.url=="/morning"){
        res.writeHead(200,{'content-Type': 'text/plain'});
        res.end("Good morning! Have a great day ahead!");
    }
    else if(req.url=="/evening"){
        res.writeHead(200,{"content-Type": "text/plain"});
        res.end("Good evening! Hope you had a great day!");
    }
    else{
        res.writeHead(404,{'content-Type': "text/plain"});
        res.end('Not Found');
    }
});

server.listen(5000,()=>{
    console.log("server started...");
})