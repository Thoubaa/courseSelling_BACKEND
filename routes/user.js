const {Router} = require("express")

const userRouter=Router();

userRouter.post("/signup",(req,res)=>{
    res.send("Signed up")
})
userRouter.post("/signin",(req,res)=>{
    res.send("Signed in")
})

userRouter.get("/purchased",(req,res)=>{
    res.send("Purchase items")
})


module.exports={
    userRouter
}