const http = require('http');
const url = require('url');

let arr = [];

const server = http.createServer((req,res)=>{
    if (req.url==="/notes" && req.method === "POST") {
    let body = '';

    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', () => {
        try{
            const parsed = JSON.parse(body);
            const note = parsed.note;

            arr.push(note);
            console.log(arr);
        res.end("Note added");
        } catch(err){
            console.log("error occur");
             res.end("Invalid data");

        }
    });
}

else if(req.url==="/notes" && req.method=="GET"){
     res.writeHead(200, { 'Content-Type': 'application/json' });
            console.log((arr));

        res.end(JSON.stringify(arr));
}

})

server.listen(3000,()=>[
    console.log("server started...")
])