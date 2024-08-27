const { z } = require("zod");

// creating login schema
const loginSchema = z.object({
 
    email: z
   .string({required_error:"Email is required" })
   .trim()
   .email({message:"Invalid Email address"})
   .min(3,{ message:"Email must be at least of 3 characters"})
   .max(255,{ message:"Email must not be at more than 255 characters"}),

   password: z
   .string({required_error:"Password is required" })
   .min(7,{ message:"Password must be at least of 6 characters"})
   .max(1024,{ message:"Password must not be at more than 1024 characters"}),


})


// creating signup  schema

const signupSchema = loginSchema.extend({
    username: z 
    .string({required_error:"Name is required" })
    .trim()
    .min(3,{ message:"Name must be at least of 3 characters"})
    .max(255,{ message:"Name must not be at more than 255 characters"}),

phone: z 
   .string({required_error:"Phone is required" })
   .trim()
   .min(10,{ message:"Phone must be at least of 10 characters"})
   .max(10,{ message:"Phone must not be at more than 10 characters"}),

});


module.exports = {signupSchema, loginSchema};