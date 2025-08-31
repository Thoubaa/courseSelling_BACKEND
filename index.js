const express = require('express');
const {userRouter} = require("./routes/user")
const {courseRouter} = require("./routes/course")
const {adminRouter} = require("./routes/admin")
const mongoose = require("mongoose")
require("dotenv").config()
const {rateLimitter} = require("./middlewares/rateLimitter")  

const app = express();
app.use(express.json());


app.use("/user",rateLimitter,userRouter)
app.use("/course",rateLimitter,courseRouter)
app.use("/admin",rateLimitter,adminRouter)



async function main(){
    await mongoose.connect(process.env.MONGO_URI)
    app.listen(process.env.PORT)
    console.log("DB connected and Backend running on port 3000")
}

main();

