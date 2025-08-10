const express = require('express');
const router = express.Router();

const users = [
  { id: '101', name: 'Alice', age: 25 },
  { id: '102', name: 'Bob', age: 30 },
  { id: '103', name: 'Charlie', age: 22 }
];

router.get('/routes/users',(req,res)=>{
    try{
            res.json({users});
    } catch(err){
        res.json({message: "Users not found", error: err.message})
    }
})

router.get('/routes/users/:id',(req,res)=>{
    try{
        const uId = req.params.id;
        if(isNaN(uId)){
            return res.status(400).json({ message: "ID must be a number" });
        }
        const requiredUser = users.find(e=>e.id===uId);
        res.status(200).send({requiredUser});
    } catch(err){
        res.json({message: "Id not found",error: err.message});
    }
})

module.exports =  router



