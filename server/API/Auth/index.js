import  express  from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// to prevent some extra reloading we requires router.

const Router = express.Router();

// Models
import { UserModel } from "../../database/users";

/*

Route    /signup
Descrip  Signup with email and password
Params   None
Access   Public
Method   POST
*/

Router.post("/signup" , async (req , res) => {
    // it is the best practice to use try and catch for debugging
    // 500 - will throw all errors inside your code its like some internal server error . As we cannot display the error code to the entire world which leads to hacking in production level.
    try {

        const { email, password, fullname, phoneNumber} = req.body.credentials;

        //check wheather email or phone number exists

        const checkUserByEmail = await UserModel.findOne({email});

        const checkUserByPhone = await UserModel.findOne({phoneNumber});

        if(checkUserByEmail || checkUserByPhone){
            return res.json({error: "User Already Exits "});
        }

        // hashing -> password encrption into hexcode;
        
        //salting -> bascially means doing hasing again and again repeated iteration . (increases security ) password is very secure and it will never be decoded anyway.



        //hashing and salting 
        const bcryptSalt = await bcrypt.genSalt(8); // bcrypt will generally fetch our password and generate a salting of 8 iteration (hashed for 8 times).


        const hashedPassword = await bcrypt.hash(password , bcryptSalt);


        //DB --> create query is used to create field inside ou database 
        await UserModel.create({
            // spreading our body because it contains alot of things using spread operator
           ...req.body.credentials,
            password : hashedPassword
        });

        // JWT Auth Token -> adding extra layer of security its for making transfer of information between different party very secured.

        const token = jwt.sign({user: {fullname, email}} ,"ZomatoApp"); // Alot of token and personalize very much customize things which are related to security those things we are hardcoding here and that should be done we should create a .env file and we will storing all those things. its is not good practice to do this.

        return res.status(200).json({token}); // everything goes fine then let us just response with status 200 jwt token

    } catch (error) {
        return res.status(500).json({error: error.message});
    }

});

export default Router;

// password - Bal0r
//encrypted  -  45hadhhchhai6e%99 (1st encrypted) -> wueuhscbvcbudjds (again encrypted)

// if we want high level of password security then very good website have 2 , 3 ,4 10, 15 encryption for our password so that it can save securely. This will increase the reload time it will decrease the performance by some level (very small -> milisec) 

// so for encryption we are using bcrypt (npm package);