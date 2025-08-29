const {Router} = require("express")
const {validateBody} = require("../middlewares/bodyValidator")
const {userSchema} = require("../middlewares/userValidation") 
const bcrypt = require("bcrypt")
const {userModel} = require("../db")

const userRouter=Router();

userRouter.post("/signup",validateBody(userSchema),async (req,res)=>{
    const {email, firstName, lastName, password} = req.body;
    const hashpassword = await bcrypt.hash(password,10);
    try{await userModel.create({
        email: email,
        password: hashpassword,
        firstName: firstName,
        lastName: lastName
    })}catch(e){
        return res.status(400).send(`error: ${e}`)
    }

    res.send("Signed up")
})
userRouter.post("/signin",async (req,res)=>{
    const {email,password} = req.body;

    const user = await userModel.findOne({email})
    if(user){
        const matchPassword =await bcrypt.compare(password, user.password)
        if(!matchPassword) return res.send("Invalid email or password")
    
    } else{ return res.send("Invalid email or password")
}
    res.send("Signed in")
})



userRouter.get("/purchased",(req,res)=>{
    res.send("Purchase items")
})


module.exports={
    userRouter
}