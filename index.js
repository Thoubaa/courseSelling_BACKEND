const express = require('express');
const {userRouter} = require("./routes/user")
const {courseRouter} = require("./routes/course")
const {adminRouter} = require("./routes/admin")
const mongoose = require("mongoose")
require("dotenv").config()

const app = express();


app.use("/user",userRouter)
app.use("/course",courseRouter)
app.use("admin",adminRouter)



async function main(){
    await mongoose.connect(MONGO_URI)
    app.listen(PORT)
    console.log("DB connected and Backend running on port 3000")
}

main();

