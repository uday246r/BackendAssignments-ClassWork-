const express= require('express');
const app = express();

app.get('/blog/:year/:month/:slug',(req,res)=>{
    const {year,month,slug} = req.params;
    res.setHeader('Content-Type' , 'text/plain')  // in text/plain we can use \n so that's why their we set text/plain , if we not specify then it consider it html and their we can't we \n at that case we have to use <br> tag
    res.send(`Viewing blog post: ${slug} \n Published: ${month}, ${year}`)
})


app.listen(3000,()=>{
    console.log("SERVER STARTED...");
})