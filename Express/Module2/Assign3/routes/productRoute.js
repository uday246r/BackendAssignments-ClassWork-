const express = require('express');
const router = express.Router();

const productContent = [
    {id:1, title:"product1", category:"dairy"},
    {id:2, title:"product2", category:"stationary"},
    {id:3, title:"product3", category:"dairy"}
]

router.get('/products',(req,res)=>{
   try{
     res.json({productContent});
   } catch(err){
    res.status(400).json({error: "products not found"});
   }
})

router.get('/products/:category/:id',(req,res)=>{
   try{
    const cId = req.params.category
    const pId = req.params.id;
    if(pId && cId){
     const productData = productContent.find((e)=> (e.id == pId) && (e.category == cId))
     res.status(200).json({productData});
    }
    else{
        return res.status(404).json({message: "Invalid Product details"})
    }
   } catch(err){
    res.status(400).json({message: "Product not found"});
   }
})

module.exports = router;