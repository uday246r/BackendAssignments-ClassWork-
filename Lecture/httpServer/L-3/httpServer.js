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
        let arr ;
        req.on("data", (chunk)=>{
            body += chunk.toString()
        })
        req.on('end', ()=>{
            // console.log(querystring.parse(body))
            fs.readFile('./data.json', "utf-8", (err, data)=>{
               if(data.length != 0){
                arr = JSON.parse(data)
               }else{
                arr = []
               }
               arr.push(querystring.parse(body))
               fs.writeFile('./data.json', JSON.stringify(arr), (err)=>{
                if(!err){
                    res.end('success')
                }
               })
            })
        })
    }
})

server.listen(3000, ()=>{
    console.log('server started...')
})



