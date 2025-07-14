const http = require('http');
const fs = require('fs');
const url = require('url');
const querystring = require('querystring');
const calc = require('./calculate');

const server = http.createServer((req,res)=>{
if(req.url==='/' && req.method==='GET'){
    fs.readFile('./login.html','utf-8',(err,data)=>{
        if(!err){
            res.writeHead(200,{'content-Type':'text/html'})
            res.write (data);
            res.end();
        }
    })
}

if(req.url.startsWith('/add') && req.method==='GET'){
        const query = url.parse(req.url, true).query;
        const sum = calc.add(Number(query.num1),Number(query.num2));
        res.write(`Result ${sum}`);
        res.end();
}

if(req.url.startsWith('/subt') && req.method=='GET'){
    const query = url.parse(req.url,true).query;
    const diff = calc.sub(Number(query.num1), Number(query.num2));
    res.write(`Result: ${diff}`);
    res.end();
}

if(req.url.startsWith('/divi') && req.method=='POST'){
    let body='';
    
    req.on('data',(chunk)=>{
        body+=chunk.toString();
    })
    req.on('end',()=>{
        const {num1,num2} = querystring.parse(body);
        if(Number(num2)==0){
            res.write("Can't divide with zero");
        }
        else{
            const division = calc.div(Number(num1),Number(num2));
            res.write(`Result: ${division}`);
            res.end();
        }
    })
}

if(req.url.startsWith('/mul') && req.method==='POST'){
    let body='';
    req.on('data',(chunk)=>{
        body+=chunk.toString();
    })
    req.on('end',()=>{
        const {num1,num2}=querystring.parse(body);
        const multiplication = calc.mul(Number(num1),Number(num2));
        res.write(`Result ${multiplication}`);
        res.end();
    })
}


})

server.listen(3000,()=>{
    console.log("server started.....");
});


// Ques2
// Task 1: Create a Node.js HTTP server that listens on port 3000.

// Task 2: On visiting the root /, the server should display four HTML forms,(these html page contain beautiful css), each pointing to a different endpoint:

// /add

// /sub

// /mul

// /div

// Each form must have:

// Two input fields: num1 and num2

// One submit button

// Method should be GET for /add,/sub
// Method should be POST for /mul,/div

// Create a custom module named calculate.js that exports four functions:


// add(a, b)
// sub(a, b)
// mul(a, b)
// div(a, b)
// In your main server file:

// Route based on /add, /sub, /mul, /div

// Use the corresponding function from the custom module and send the result as a response:

// eg send response like these (Result: 10)

// For division:

// If num2 is 0, return:

// Error: Cannot divide by zero.
// If any input is missing or invalid (non-number), return:

// Error: Invalid input.