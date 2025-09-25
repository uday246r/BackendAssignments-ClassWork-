const express = require('express');
const mongoose = require("mongoose");
const app = express();
const {Employees} = require("../db");

const employeesData = [
    {
        empid: 1,
        name: "Uday",
        salary: 10000,
        deptid: 101
    },
    {
        empid: 2,
        name: "Rahul",
        salary: 10000,
        deptid: 102
    },
    {
        empid: 3,
        name: "Raghav",
        salary: 10000,
        deptid: 103
    },
    {
        empid: 4,
        name: "Madhav",
        salary: 10000,
        deptid: 104
    },
    {
        empid: 5,
        name: "Mohan",
        salary: 10000,
        deptid: 105
    },
    {
        empid: 6,
        name: "Shyam",
        salary: 10000,
        deptid: 106
    },
]

app.post("/seed-employees",async(req,res)=>{
    try{
        const ack = await Employees.create(employeesData);
    console.log(ack);
    res.status(201).json({ message: "Employees seeded successfully", data: ack });
    }
    catch(err){
        console.log(err);
    }
})

app.get("/view-employees", async(req,res)=>{
    try{
        const data = await Employees.find();
        console.log(data);
        res.status(200).json({message: "ok", data: data});
    } catch(err){
        console.log("error in view-employees")
    }
})

app.get("/add-employee/:id/:name/:salary/:deptid", async(req,res)=>{
    try{
         const {id, name, salary, deptid} = req.params;
         const data = {
              empid: parseInt(id),      
            name: name,
            salary: parseInt(salary),
            deptid: parseInt(deptid)
         }
         const awk = await Employees.create(data);
         console.log(awk);
         res.status(201).json({ message: "Single Employee added successfully", data: awk });
    } catch(err){
        console.log(err);
    }
})

app.post("/delete-employee/:id", async(req,res)=>{
    try{
     const {id} = req.params;
     const employee = await Employees.findOneAndDelete({empid:Number(id)});
     if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    console.log(employee);
    res.status(200).json({ message: " Employee deleted successfully", data: employee });

    } catch(err){
        console.log(err);
        res.status(400).json({ message: "Error occur", data: err });
    }
})

app.post("/delete-employee-lt/:id", async(req,res)=>{
    try{
     const {id} = req.params;
     const employee = await Employees.deleteMany({empid: {$lte : Number(id)}});
     if (employee.deletedCount==0) {
      return res.status(404).json({ message: "Employee not found" });
    }
    console.log(employee);
    res.status(200).json({ message: " Employee deleted successfully", data: employee });

    } catch(err){
        console.log(err);
        res.status(400).json({ message: "Error occur", data: err });
    }
})

app.patch("/update-salary/:id/:amount", async(req,res)=>{
    try{
     const {id, amount} = req.params;
     const employee = await Employees.findOne({empid: Number(id)});
     if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
     await Employees.updateOne(
        { empid: id },
        { $set: {salary: amount} }
    );
    const updatedEmployee = await Employees.findOne({empid: Number(id)});
    console.log(updatedEmployee);
    res.status(200).json({ message: " Single Employee salary updated successfully", data: updatedEmployee });

    } catch(err){
        console.log(err);
        res.status(400).json({ message: "Error occur", data: err });
    }
})

app.path("/update-salary-range/:id/:amount", async(req,res)=>{
    try{
        const {id, amount} = req.params;
        
     const employee = await Employees.findOne({empid: Number(id)});
     if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
     await Employees.updateMany(
        { empid: id },
        { $set: {salary: {$gte : Number(amount) }} }
    );
    res.status(200).json({ message: " Employee salary updated successfully", data: updatedEmployee });

    } catch(err){

    }
})

app.get("/search-employee/:name",async(req,res)=>{
   try{
    const { name } = req.params;
    console.log(name);
    const employee = await Employees.find({name: name});
    console.log(employee);
    res.status(200).json({message: "Successfully get names of employees", data: employee });
   } catch(err){
    res.status(400).json({message: "Failed to fetch  employee names", data: err});
   }
})


app.listen(3000,()=>{
    console.log("server created...");
})