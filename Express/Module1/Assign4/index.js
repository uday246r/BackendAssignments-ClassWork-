const express = require('express');
// const route = express.Router();
const server = express();

server.get('/greet',(req,res)=>{
    const greetings = {
        en : "Hello",
        fr: "Bonjour",
        hi: "Namaste"
    };

    const lang = req.query.lang;

    const message = greetings[lang] || "Hello";

    res.send(message);
})

// server.use('/',route);

server.listen(3000,()=>{
    console.log("server started...");
});