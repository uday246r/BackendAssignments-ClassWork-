const express = require('express');
const ejs = require('ejs')
const app = express();

app.set("view engine", "ejs")
app.set("views", __dirname)

const errorData = {
 errorType: "VALIDATION",
 statusCode: 200,
 message: "Success",
 timestamp: 20-12-2025,
 requestUrl: "https://google.com"
}

app.get('/',(req,res)=>{
res.render("error-layout", { errorData });
})

app.listen(3000,()=>{
    console.log("server started...")
});


