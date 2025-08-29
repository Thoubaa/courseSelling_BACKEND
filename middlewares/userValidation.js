const {z} = require("zod")

const userSchema = z.object({
    email: z.email(),
    password: z.string().min(8,"password must be atleast 8 characters").regex(/[A-Za-z]/,"password must contain letters").regex(/[0-9]/,"password must contain numbers"),
    firstName: z.string().min(3,"first name is required").max(50).trim(),
    lastName: z.string().min(3,"last name is required").max(50).trim(),

})

module.exports = {userSchema}
