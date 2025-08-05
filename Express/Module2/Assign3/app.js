const express = require('express');
const app = express();
const productRoute = require('./routes/productRoute');

app.use('/api',productRoute);


app.listen(3000,()=>{
    console.log("server started....");
})