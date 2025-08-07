const express = require('express');
const app = express();

const users = [
  { id: '101', name: 'Alice', age: 25 },
  { id: '102', name: 'Bob', age: 30 },
  { id: '103', name: 'Charlie', age: 22 }
];

app.get("/user/:id",(req,res)=>{
    const { id } = req.params;
    const person = users.find(user=>user.id==id);
    res.send(`${person.name} has id ${person.id} is ${person.age} years old.`)
})

app.listen(3000,()=>{
    console.log("server started...")
})