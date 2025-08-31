const {Router}=require("express");
const { userAuth } = require("../middlewares/userValidation");
const { purchaseModel } = require("../db");

const courseRouter = Router();

courseRouter.post("/purchase",userAuth,async (req,res)=>{
    const userId = req.userId;
    const courseId = req.body.courseId;
    //should check if user paid for the course already
    await purchaseModel.create({userId, courseId})
    res.send("Course purchased successfully");

})
courseRouter.get("/preview",async  (req,res)=>{
    const courses = await courseModel.find({})
    if(courses.length>0){
        res.send({message: "Courses found", courses})
    } else{
        res.send("No courses found")
    }
})

module.exports = {

    courseRouter
}