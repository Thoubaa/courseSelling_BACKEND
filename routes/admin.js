const {Router} = require("express")

const adminRouter=Router();

adminRouter.post("/signup",(req,res)=>{
    res.send("Signed up")
})
adminRouter.post("/signin",(req,res)=>{
    res.send("Signed in")
})

adminRouter.get("/allCourse",(req,res)=>{
    res.send("All course")
})


adminRouter.post("/course",(req,res)=>{
    res.send("course posted")
})


adminRouter.put("/updateCourse",(req,res)=>{
    res.send("All course")
})

module.exports={
    adminRouter
}