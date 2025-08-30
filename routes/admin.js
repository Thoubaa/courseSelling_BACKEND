const {Router} = require("express");
const { adminModel } = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {adminAuth,adminSchema } = require("../middlewares/adminValidation")
const {validateBody} = require("../middlewares/bodyValidator")
const {courseModel} = require("../db")

const adminRouter=Router();

adminRouter.post("/signup",validateBody(adminSchema),async (req,res)=>{
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

adminRouter.get("/allCourse",adminAuth,async (req,res)=>{
    const adminId = req.userId;
    const course = await courseModel.find({creatorId: adminId})
    if(course.length>0){
        res.send({message:"Courses found: ", course})
    } else{
        res.send("No course found")
    }
})


adminRouter.post("/course",adminAuth,async (req,res)=>{
    const adminId = req.userId;
    const {title, description, price, imageUrl} = req.body;
    const course = await courseModel.create({title, description, price, imageUrl, creatorId: adminId})

    res.send({message: "Course created successfully", courseId: course._id})

})


adminRouter.put("/updateCourse",adminAuth,async (req,res)=>{
    const adminId = req.userId;
    const {courseId, title, description, price, imageUrl} = req.body;

    const course = await courseModel.updateOne({_id: courseId,creatorId: adminId}, {title, description, price, imageUrl})
    if(course.modifiedCount>0){
        res.send({message: "Course updated successfully", courseId: course._id})}
    else{
        res.send("Course not found or you are not authorized to update this course")
    }
})

module.exports={
    adminRouter
}