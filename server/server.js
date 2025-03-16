const express = require("express");
const app = express();
const router = require("./router/auth.router.js");
const connectDB = require("./utils/db.js");

//middleware to parse json data
app.use(express.json());


//mount the router: to use the router in your main Express app, you can "mount" it at a specific URL prefix(api/auth is set by default now, whateven comes from router, gets after api/auth/...)
app.use("/api/auth", router);


//now this wont run because the above router mounting results in taking the routes from router dir only
// app.get("/", (req, res)=>{
//   console.log("this wont run")
// })

//connection to database is a promise(since we await the db connection)
//if connectDB is true(database connectied)then the express app(server) will listen 



connectDB().then(() => {
  app.listen(5100, () => {
    console.log("server running at port: 5100");
  });
});







