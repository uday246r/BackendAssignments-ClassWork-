const express = require('express');
const app = express();

app.get('/products', async (req,res)=>{

    const limit = parseInt(req.query.limit);
    const pages = parseInt(req.query.page);
    // console.log(limit);
    const fetchedData = await fetch(`https://dummyjson.com/products`);
    const response = await fetchedData.json();
    const finalProduct = await response.products;

    // const remaining = finalProduct.length - limit;

    let start = (pages-1)*limit;
    let end = start + limit;



    const responseArray = finalProduct.slice(start,end);


    res.send(responseArray);
})

app.listen(3000,()=>{
    console.log("server started...");
})