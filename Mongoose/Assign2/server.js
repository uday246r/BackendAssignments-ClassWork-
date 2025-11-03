const express = require('express');
const app= express();
const ejs = require('ejs');
const path = require("path");
const { ObjectId } = require("bson");
const { connectMongo } = require('./connectDb');
app.use(express.urlencoded({ extended: true }));

let db;
connectMongo()
.then(data=>db=data);

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))




app.get("/",async(req,res)=>{
    let page = parseInt(req.query.page) || 1;
    const limit = 5;
    const skip = (page-1) * limit;

    const total = await db.collection("student").countDocuments();
    const data = await db.collection("student").find().skip(skip).limit(limit).toArray();
    res.render("dashboard",{
        students : data,
        currentPage: page,
        totalPages: Math.ceil(total/limit)
    });
})

app.get("/edit/:id",async(req,res)=>{
   try {
    const id = req.params.id;
    let data = await db.collection("student").find({_id: new ObjectId(id)}).toArray();
        res.render("updateForm",{students:data});
   }
        catch(err){
            console.log(err);
        }
})

app.post("/filter", (req,res)=>{
    const {filtered, marks} = req.body;

    let query = {};
    if(filtered==="gt"){
        query.marks = { $gt: Number(marks)};
    } else if(filtered==="lt"){
        query.marks = { $lt: Number(marks)};
    }

    db.collection("student").find(query).toArray()
    .then(data=>res.render("dashboard", {students: data}))
    .catch(err=>console.error(err));
})

app.post("/addStudent",async(req,res)=>{
    try{let {name, section, marks} = req.body;
    await db.collection("student").insertOne({name,section,marks:Number(marks)})
    res.redirect("/")}
    catch(err){
        console.log(err);
    }
})

app.get("/delete/:id",async(req,res)=>{
    try{
        const id = req.params.id;
        await db.collection("student").deleteOne({_id: new ObjectId(id)});
        res.redirect("/");
    } catch(err){
        console.log(err);
        res.status(500).send("Error deleting student");
    }
});

app.post("/update-student",async(req,res)=>{
try{
    await db.collection("student").updateOne(
        {_id: new ObjectId(req.body.id)},
        {$set: {
            name: req.body.name,
            section: req.body.section,
            marks: Number(req.body.marks)
        }}
    );
        res.redirect("/");
}
catch(err){
console.log(err);
res.status(500).send("Error updating student");
}
    })

app.listen(3000,()=>{
    console.log("server started...");
})