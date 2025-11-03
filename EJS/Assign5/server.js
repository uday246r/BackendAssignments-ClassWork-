const express = require('express');
const ejs = require('ejs')
const app = express();

app.set("view engine", "ejs")
app.set("views", __dirname)


app.get('/',(req,res)=>{
    res.render("dashboard", {
  student: {
    name: "John Doe",
    email: "John@example.com",
    role: "admin"
  },
  courses: [
    { title: "Web Development", grade: "A" },
    { title: "Database Systems", grade: "B" },
    { title: "Operating Systems", grade: "D" }
  ],
  notice: "<b>Important Notice</b>"
});
})

app.listen(3000,()=>{
    console.log("server started...")
});