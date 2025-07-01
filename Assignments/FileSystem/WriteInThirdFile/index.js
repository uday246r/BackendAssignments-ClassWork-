const fs = require('fs');

fs.readFile('./first.txt',"utf-8",(err,data)=>{
    if(!err){
        const data1 = data;
        fs.readFile('./second.txt',"utf-8",(err,data)=>{
            if(!err){
            const data2 = `${data1}\n${data}`;
            fs.writeFile("./third.txt",data2,(err)=>{
                if(!err){
                    console.log("File Written successfully")
                }
            })
            }
        })
    }
    
})