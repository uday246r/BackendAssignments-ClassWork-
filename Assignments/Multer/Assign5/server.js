const { urlencoded } = require('body-parser');
const express = require('express');
const app = express();
app.use(express.urlencoded());
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination:(req,file,cb) =>{
        if(req.url=="/profile_pics"){
            cb(null,"./uploads/profile_pics");
        }
        else if(req.url=="/documents"){
            cb(null,"./uploads/documents");
        }
        else{
            cb(null,"./uploads/others");
        }
    },
    filename:(req,file,cb)=>{
        const name = file.originalname;
        cb(null,name);
    }
})

const upload = multer({
    storage: storage,
    fileFilter: (req,file,cb)=>{
        const extname = path.extname(file.originalname).toLowerCase();
        if(file.fieldname=="profile-pic" && (extname==".jpg" || extname==".png")){
            cb(null,true);
        }
        else if(file.fieldname=="documents" && (extname==".docx" || extname==".pdf")){
            cb(null,true);
        }
        else{
            cb(null,true);
        }
    },
    limits: {
        fileSize: 2*1024*1024
    }
})

app.get("/",(req,res)=>{
res.sendFile(path.join(__dirname+"/pages/form.html"))
})

app.post("/upload",upload.fields([{name:"profile",maxCount:1},{name:"document",maxCount:"4"},{name:"other",maxCount:"5"}]),(req,res)=>{
   
res.json({
            message: "Profile Pic Uploaded",
            files: req.file,
        })
    
})

app.listen(3000,()=>{
    console.log("server started....");
})