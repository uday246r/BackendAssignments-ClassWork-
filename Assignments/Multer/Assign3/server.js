const express = require("express");
const app = express();
const multer = require("multer");
const fs = require("fs");
const path = require("path");
app.use(express.urlencoded());

const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        if(req.url=="/upload"){
            cb(null,"./uploads/resumes");
        }
    },
    filename: (req,file,cb)=>{
        const currentDate = Date.now();
        const name = currentDate + "-" + file.originalname;
        cb(null,name);
    }
})

const upload = multer({
    storage: storage,
    limits: {
        fileSize : 2*1024*1024
    }
})

app.get("/",async(req,res)=>{
    res.sendFile(path.join(__dirname,"/pages/form.html"));
})

app.post("/upload",upload.single("resume"), async(req,res)=>{
    const data = req.body;

    if(!req.file){
        return res.status(400).json({
            success: false,
            message: "Invalid file type!"
        })
    }

    const entry = {
        name: data.name,
        email: data.email,
        number: data.number,
        filePath: `uploads/resumes/${req.file.filename}`,
        uploadedAt: new Date().toISOString()
    };

    
 let arr = [];
                fs.readFile("./data.json","utf-8",(err,fileData)=>{
                    if(!err && fileData){
                        try{
                        arr = JSON.parse(fileData);
                        }
                        catch(e){
                            arr = [];
                        }
                }
    arr.push(entry);

    fs.writeFile("./data.json",JSON.stringify(arr),(err)=>{
        if(!err){
        console.log("File uploaded successfully!");
        return res.status(200).json({
        success: true,
        message: "Sucessfully Submitted",
        file: req.file
    })
}
    })
})

})

app.listen(3000,()=>{
    console.log("server started....");
})