const http = require('http');

const server = http.createServer((req,res)=>{
    if(req.url=="/api/user"){
        res.write(JSON.stringify({
            "name" : "John Doe",
            "age": 30,
            "profession": "Developer"
        }))
        res.end();
    }
    else{
        res.write("404-Page Not Found")
        res.end()
    }
})

server.listen(3000);