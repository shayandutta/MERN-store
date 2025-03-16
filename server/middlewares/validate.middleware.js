
//schema here -> auth.validator.js ka signupSchema
const validate = (schema) => async (req, res, next) => {
    try{
        const parseBody = await schema.parseAsync(req.body); //checks that i data sent by the user matches to the zod schema
        req.body = parseBody;
        next();
    }
    catch(err){
        console.log(err);
        const message = err.errors[0].message;
        res.status(400).json({msg: message});
    }
}


module.exports = validate;