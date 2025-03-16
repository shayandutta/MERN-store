const mongoose = require('mongoose');
require("dotenv").config();

const URI = process.env.MONGO_URI
// mongoose.connect(URI);


const connectDB = async () => {
    try{
        await mongoose.connect(URI);
        console.log("connection to database successful");
    }
    catch(error){
        console.error ("database connection failed", error);
        process.exit(0); //pyaar se bahar nikal jao agar connect nahi huwa
    }
}

module.exports = connectDB;




