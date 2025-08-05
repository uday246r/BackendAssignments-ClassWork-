const express = require('express');
const router = express.Router();

const commentsContent = [
    {"id":1, title:"good"},
    {"id":2, title:"excellent"},
    {"id":3, title:"fabulous"}
]

router.get('/comments',(req,res)=>{
   try{
     res.json({commentsContent});
   } catch(err){
    res.status(400).json({error: "comment not found"});
   }
})

router.get('/comments/:id',(req,res)=>{
   try{
    const cId = req.params.id;
    if(cId){
if(cId){
     const commentData = commentsContent.find((e)=>e.id == cId)
     res.status(200).json({commentData});
    }    }
    else{
        return res.status(404).json({message: "cid not found"})
    }
   } catch(err){
    res.status(400).json({message: "comment not found"});
   }
})

module.exports = router;