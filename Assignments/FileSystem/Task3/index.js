
// B.	Copy a File Using Node.js File System Module
// Write a Node.js script that copies a file named report.pdf from the root directory to a folder named backups located in the same directory as your script.
// 1.	Source File: The file to copy is report.pdf and is located in the root directory where the script runs.
// 2.	Destination Folder: ./backups/
// 3.	If the backups folder does not exist, the script should create it.
// 4.	After copying, print a message like:
// File copied successfully to backups/report.pdf
// 5.	If an error occurs (like the source file is missing), it should display a clear error message.


const fs = require('fs');

// Get the current filenames
// before the function
getCurrentFilenames();

function getCurrentFilenames(){
    fs.readdir(__dirname,(err,files)=>{
        files.forEach((file)=>{
        console.log(file);
        })
    })
}
