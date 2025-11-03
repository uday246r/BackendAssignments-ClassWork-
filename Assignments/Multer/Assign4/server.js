const express = require('express');
const app = express();
const multer = require('multer');
const fs  = require('fs');
const path = require('path');
app.use(express.urlencoded());


const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        if(req.url=="/upload"){
            cb(null,"./uploads/products");
        }
    },
    filename: (req,file,cb)=>{
        const currentDate = Date.now();
        const name = currentDate + "-" +file.originalname;
        cb(null,name);
    }
})

const upload = multer({
    storage: storage,
    fileFilter: (req,file,cb)=>{
        const extname = path.extname(file.originalname).toLowerCase();
        if(extname==".jpg" || extname==".png"){
            cb(null,true);
        }
        else{
            cb(new Error("Only .jpg and .png file allowed"));
        }
    },
    limits: {
        fileSize:2*1024*1024
    }
})

app.get("/",async(req,res)=>{
    res.sendFile(path.join(__dirname,"/pages/form.html"));
})

app.post("/upload",upload.single('products'),async(req,res)=>{
    if(!req.file){
        return res.status(400).json({
            success: false,
            message: "Invalid file type!"
        })
    }
    res.status(200).json({
        success: true,
        message: "Images uploaded",
        file: req.file
    })
})

app.listen(3000,()=>{
    console.log("server started....");
})