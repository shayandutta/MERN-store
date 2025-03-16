const User = require("../models/user.model.js");
const bcrypt = require("bcryptjs");

//controllers-> part of the code that is responsible for handling the application's logic.
//controllers are typically used to process incoming requests, interact with models(data sources), and send responses back to clients.
//they help organize our application by separating concerns and following the MVC design pattern

//user registration logic
// *-----------------STEPS--------------------*
//1. get registration data: retrieve user data (username, email, password)
// 2. check email existence: check if the email is already registered.
// 3. hash password: securely hash the password.
// 4. create user: create a new user with hashed password.
// 5. save to db: save user data to the database
// 6. respond: respond with "registration successful" or handle errors.

const register = async (req, res) => {
  try {
    const { username, email, phone, password } = req.body; //1
    console.log(req.body);

    const userExist = await User.findOne({ email }); //2
    if (userExist) {
      return res.status(400).json({ msg: "email already exists" });
    }

    //hash the password
    // const saltRound = 10; //degree of hashed password (security)
    // const hashPassword = await bcrypt.hash(password, saltRound);

    const userCreated = await User.create({
      username,
      email,
      phone,
      password,
    }); //4

    res
      .status(201)
      .json({
        msg: "registration successful",
        token: await userCreated.generateToken(), //jwt token, created in user.model.js will be added to 'token' here
        userID: userCreated._id.toString(),
      }); //6 
  } catch (error) {
    res.status(400).json("internal server error");
  }
};







// login logic

const login = async (req, res) => {
    try{
        const {email, password} = req.body;

        const userExist = await User.findOne({email}); //all the credentials will be fetched
        console.log(userExist);

        if(!userExist){
            return res.status(400).json({message: "invalid credentials"});
        }

        // const user = await bcrypt.compare(password, userExist.password);

        const user = await userExist.comparePassword(password);
        

        if(user){
            res.status(200).json({
                msg:"Login successful",
                token: await userExist.generateToken(),
                userID: userExist._id.toString(),
            });
        }
        else{
            res.status(401).json({message: "invalid email or password"});
        }
    }
    catch(error){
        res.status(500).json("internal server error");
    }
}




module.exports = { register, login };
