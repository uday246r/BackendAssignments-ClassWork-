const http = require('http')
const fs = require('fs')
const querystring = require('querystring')

const server = http.createServer((req, res)=>{
    if(req.url == "/login" && req.method == "GET"){
        fs.readFile('./login.html', (err, data)=>{
            if(!err){
                res.writeHead(200, {'content-type': 'text/html'})
                res.write(data)
                res.end()
            }
        })
    }else if(req.url == "/login" && req.method == "POST"){
        let body = ""
        req.on("data", (chunk)=>{
            body += chunk.toString()
        })
        req.on('end', ()=>{
            console.log(querystring.parse(body))
        })
    }
})

server.listen(3000, ()=>{
    console.log('server started...')
})