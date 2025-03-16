//express.Router() is a mini express application without all the server configs but with the ability to define routes, middleware, and even have its own set of route handlers
//it allows us to modularize our routes and middleware to keep our code organized and maintainable
//express.Router() class is used to create modular, mountable, route handlers.
//a router instance is a complete middleware and routing system, for this reason, it is often referred to as a "mini-app"



const express = require('express');
const router = express.Router();
// const {home, register} = require("../controllers/auth.controller") //not a good practice
const authcontrollers = require("../controllers/auth.controller.js")  //clean code and good practice
//form validation with zod
const signupSchema = require("../validators/auth.validator.js")
const validate = require("../middlewares/validate.middleware.js")

// router.get("/", (req, res)=> {
//     res.status(200).send("router setup")
// })



//defining the routes

router.route("/register").post( validate(signupSchema), authcontrollers.register) //pehle check kar rahe hai (validate kar rahe hai) ki sab thik hai ki nahi, 
//uske baad registration wale middleware pr jayega

router.route("/login").post(authcontrollers.login);


module.exports = router;

