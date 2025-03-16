//storing these credentials of the users
const bcrypt = require('bcryptjs');
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
    },
    email:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    isAdmin:{
        type: Boolean,
        default: false,
    }

})

//middleware
//secure the password with bcrypt
//pre method -> before saving the password, hash it (if password isnt saved)
userSchema.pre('save', async function(){
    console.log("pre method", this);
    const user = this;

    //if password not modified jump to the next step
    if(!user.isModified('password')){
        next(); //middleware
    }
    try{
        const saltRound = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, saltRound);
        user.password = hashedPassword;
    }
    catch(error){
        next(error);
    }

})

//compare password
userSchema.methods.comparePassword = async function(password){
    return bcrypt.compare(password, this.password);
}





//jwt


//servers issues jwt and is stored in local storage(browser storage) and not on the db
userSchema.methods.generateToken = async function () { //using this we can acess generateToken instance in any file inside any folder of our project
    try {
        //generating the token and returning it
        return jwt.sign({
            userID: this._id.toString(), //string me convert karke pass kar raha hu, userID ko
            email: this.email,
            isAdmin: this.isAdmin,
        },
        process.env.JWT_SECRET_KEY,
         {
            expiresIn: "30d",
         }
    )
    } catch (error) {
        console.error(error);
    }
}









//define the model or the collection name
const User = new mongoose.model("User", userSchema); // ("collection_name", schema)
module.exports = User;