const express = require('express');
const app = express();

app.post("/user/signup",(req,res)=>{
    res.send("Signed up")
})
app.post("/user/signin",(req,res)=>{
    res.send("Signed in")
})

app.get("/user/purchased",(req,res)=>{
    res.send("Purchase items")
})

app.post("/course/purchase",(req,res)=>{
    res.send("Purchased")
})
app.get("/user/signup",(req,res)=>{
    res.send("Courses")
})

app.listen(3000,()=>{
    console.log("Course Selling Backend is online");
});