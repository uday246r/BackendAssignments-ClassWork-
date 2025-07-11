
// B.	Copy a File Using Node.js File System Module
// Write a Node.js script that copies a file named report.pdf from the root directory to a folder named backups located in the same directory as your script.
// 1.	Source File: The file to copy is report.pdf and is located in the root directory where the script runs.
// 2.	Destination Folder: ./backups/
// 3.	If the backups folder does not exist, the script should create it.
// 4.	After copying, print a message like:
// File copied successfully to backups/report.pdf
// 5.	If an error occurs (like the source file is missing), it should display a clear error message.


//.........................................................................................................
// Extra part
// ........................................................................................................

const fs = require('fs');
const path = require('path');

// Get the current filenames
// before the function
// getCurrentFilenames();

// const toCopy = path.join(__dirname,"..","..","report.pdf");
// const destination = path.join(__dirname,"./backups");
// console.log(destination);

// function getCurrentFilenames(){
//     fs.readdir(__dirname,(err,files)=>{
//         files.forEach((file)=>{
//         console.log(file);
//         })
//     })
// }

// fs.copyFile(toCopy,destination,(err)=>{
//     getCurrentFilenames();
// })

//..........................................................................................................
//..........................................................................................................

//Solution

// fs.readdir(".",{WithFileTypes:true},(err,data)=>{
// fs.writeFile("./reportBackup.pdf",data,(err)=>{
//     if(!err) console.log("Sucessfully backup")
//         else console.log("Backup Fail")
// })
// })


const targetPath = path.join(__dirname,"../../../");

fs.readdir(targetPath,{withFileTypes : true},(err,files)=>{
    if(!err){
        files.forEach((file)=>{
            if(file.isFile() && file.name.endsWith(".txt")){
                const filePath = path.join(targetPath,file.name)
                fs.readFile(filePath,"utf-8",(err,data)=>{
                fs.appendFile("backup.txt",data,(err)=>{
                    if(!err){
                        console.log("sucessfully written");
                    }
                    else{
                        console.log("Fail to write");
                    }
                })
            })
            }
        })
    }
    else{
        console.log("Fail to initial read");
    }
})

