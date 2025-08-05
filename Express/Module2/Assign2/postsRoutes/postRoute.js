const express = require('express');
const router = express.Router();

const postsContent = [
    {id:1, title:"post1"},
    {id:2, title:"post2"},
    {id:3, title:"post3"}
]

router.get('/posts',(req,res)=>{
   try{
     res.json({postsContent});
   } catch(err){
    res.status(400).json({error: "posts not found"});
   }
})

router.get('/posts/:id',(req,res)=>{
   try{
    const pId = req.params.id;
    if(pId){
     const postData = postsContent.find((e)=>e.id == pId)
     res.status(200).json({postData});
    }
    else{
        return res.status(404).json({message: "uid not found"})
    }
   } catch(err){
    res.status(400).json({message: "posts not found"});
   }
})

module.exports = router;