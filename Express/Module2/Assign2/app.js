const express = require('express');
const app = express();
const commentsRoute = require('./commentsRoute/commentRoute');
const postsRoute = require('./postsRoutes/postRoute');

app.use('/api',postsRoute);
app.use('/api',commentsRoute);


app.listen(3000,()=>{
    console.log("server started....");
})