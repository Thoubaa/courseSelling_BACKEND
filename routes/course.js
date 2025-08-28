const {Router}=require("express")

const courseRouter = Router();

courseRouter.post("/purchase",(req,res)=>{
    res.send("Purchased")
})
courseRouter.get("/preview",(req,res)=>{
    res.send("Course previer")
})

module.exports = {

    courseRouter
}