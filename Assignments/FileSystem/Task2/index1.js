// A. Periodic Logger with File System Module
// Problem Statement:
// Build a simple Node.js script that continuously logs the current timestamp to a file named activity.log every 10 seconds.

// Requirements:
// Use the fs module to write to a file.

// The file name must be: activity.log.

// Every 2 minutes:

// Get the current system time.

// Format it in a readable form (example: 2025-06-30 14:02:00).

// Append this timestamp to the file activity.log with a message like:
// Log entry at 2025-06-30 14:02:00

// Ensure:

// If the file does not exist, it should be created automatically.

// If the file already exists, new entries should be appended (do not overwrite existing content).

const fs = require('fs');


setInterval(()=>{
 const currentTime = new Date().toLocaleTimeString();
fs.appendFile("./activity.log",currentTime,(err)=>{
    fs.readFile("./activity.log","utf-8",(err,data)=>{
    console.log("Time After 2 minutes: " ,currentTime);
   })
})
},10000)


