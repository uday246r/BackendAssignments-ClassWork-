const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname,'public')));

app.get('/home',(req,res)=>{
    res.sendFile(path.join(__dirname,'public','home.html'))
})

app.listen(3000,()=>{
console.log("server started..")
})


// ..............home.html.........................

// <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Document</title>
//     <link rel="stylesheet" href="style.css"></link>
// </head>
// <body>
//     <h1>inside html form</h1>
// </body>
// <script src="script.js"></script>
// </html>