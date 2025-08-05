const express = require('express');
const app = express();
const userRouter = require('./routes/usersRoutes');

app.use('/api',userRouter);

app.listen(3000,()=>{
    console.log("server started");
})