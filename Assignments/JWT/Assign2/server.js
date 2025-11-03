const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const SECRET_KEY = "mySecret123";

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "login.html"));
});

app.post("/login", (req, res) => {
  const data = req.body;
  let arr = [];

  fs.readFile(path.join(__dirname, "user.json"), "utf-8", (err, fileData) => {
    if (err) return res.status(500).send("Server Error");

    try {
      arr = JSON.parse(fileData);
    } catch (e) {
      arr = [];
    }

    const user = arr.find(
      (e) => e.username === data.username && e.password === data.password
    );

    if (!user) return res.status(401).send("Invalid username or password");

    const token = jwt.sign(
      {
        username: user.username,
        role: user.role,
        loginTime: new Date().toISOString(),
      },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, { httpOnly: true });

    return res.redirect("/profile");
  });
});

function verifyToken(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.redirect("/");

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.redirect("/");
    req.user = decoded;
    next();
  });
}

app.get("/profile", verifyToken, (req, res) => {
  const loginTime = new Date(req.user.loginTime);
  const now = new Date();
  const timeSinceLogin = Math.floor((now - loginTime) / 1000);

  res.send(`
    <h1>Profile Page</h1>
    <p><b>Username:</b> ${req.user.username}</p>
    <p><b>Role:</b> ${req.user.role}</p>
    <p><b>Time Since Login:</b> ${timeSinceLogin} seconds</p>
    <p><b>JWT Token:</b></p>
    <textarea rows="5" cols="80">${req.cookies.token}</textarea><br><br>
    <a href="/logout">Logout</a>
  `);
});

app.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
});

app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});
