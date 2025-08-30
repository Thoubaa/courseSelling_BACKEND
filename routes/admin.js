const {Router} = require("express");
const { adminModel } = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const adminRouter=Router();

adminRouter.post("/signup",async (req,res)=>{
     const {email, firstName, lastName, password} = req.body;
    const hashpassword = await bcrypt.hash(password,10);
    try{await adminModel.create({
        email: email,
        password: hashpassword,
        firstName: firstName,
        lastName: lastName
    })}catch(e){
        return res.status(400).send(`error: ${e}`)
    }

    res.send("Signed up")
})
adminRouter.post("/signin",async(req,res)=>{
    const {email,password} = req.body;

    const user = await adminModel.findOne({email})
    if(user){
        const matchPassword =await bcrypt.compare(password, user.password)
        if(!matchPassword) return res.send("Invalid email or password")
        const token = jwt.sign({userId: user._id},process.env.ADMIN_SECRET_KEY);
        res.send({Message: "Signed in" ,token: token})
    } else{ return res.send("Admin not found")
        }
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