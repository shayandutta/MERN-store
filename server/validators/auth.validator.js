const { z } = require("zod");

// creating an object schema

const signupSchema = z.object({
  username: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, { message: "Name must be atleast of three characters" })
    .max(255, { message: "Name must not exceed 255 characters" }),
  email: z
    .string({ required_error: "email is required" })
    .trim()
    .min(3, { message: "email must be atleast of three characters" })
    .max(255, { message: "email must not exceed 255 characters" }),
  phone: z
    .string({ required_error: "phone number is required" })
    .trim()
    .min(3, { message: "phone number must be atleast of 10 characters" })
    .max(255, { message: "phone number must not exceed 255 characters" }),
});


module.exports = signupSchema;