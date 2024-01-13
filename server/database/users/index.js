import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema({
    fullname : {type: String, required: true },
    email : {type: String , required: true},
    password: {type: String},
    address: [{details: {type: String}, for: {type: String}}],
    phoneNumber: [{type: Number}]
},{
    timestamps: true,
});

// use for reducing code in auth API.
UserSchema.statics.findEmailAndPhone = async (email , phoneNumber) =>{
    // check  whether the email exists

    const checkUserByEmail = await UserModel.findOne({email});

    // check whether the phoneNumber exists
    const checkUserByPhone = await UserModel.findOne({phoneNumber});


        // whenever we use the static we can't return instead of that we can throw a error.
    if (checkUserByEmail || checkUserByPhone){
        throw new Error("User Already Exist");
    }

    return false; // no User with this email or phoneNumber exists. 
};

// reduce code of hasing and salting in auth API. so for reducing that we have to use pre function inbuilt method

// first parameter ("save") -> It is action we are going to take when we are going to take the action why we are going to take the action.

// second parameter (function(next)) -> it tells what happen after the function like action has exected what are you going to do.

// whenever i'm creating a new database and saving it then this pre function should be executed.
UserSchema.pre("save" , function(next) {
    const user = this; // this means the present schema


     // password is not Modified
    if(!user.isModified("password")) return next();// if exist is not modiefied means user has already have password(already existing user).

    // generating the bcrypt salt 
    bcrypt.genSalt(8 , (error , salt) => {
            if(error) return next(error);

            // hashing the password 
            bcrypt.hash(user.password, salt, (error,hash) => {
                if(error) return next(error);

                // assigning hashed password
                user.password = hash;
                return next;
            });
    });


});
export const UserModel = mongoose.model("Users" , UserSchema)