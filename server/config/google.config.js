import googleOAuth from "passport-google-oauth20";
// passport is basically most imp thing which we will be used as property as authentication

import { UserModel } from "../database/allModels";
import passport from "passport";

// google stragety- creating const  and inside that we are trying to access the google stragety method. {Authentication Stragety} for authentication providers or authentication users


const GoogleStrategy = googleOAuth.Strategy;


export default (passport) => {
    passport.use(
        new GoogleStrategy ({
           clientID: process.env.GOOGLE_CLIENT_ID,
           clientSecret: process.env.GOOGLE_CLIENT_SECRET,
           callbackURL: "http://localhost:4000/auth/google/callback"
        },
        // documentation ->  google auth boiler plate is availble so don't need from scratch
        async(accessToken, refreshToken, profile, done  ) => {
            const newUser = {
                fullname: profile.displayName,
                email: profile.emails[0].value,
                profilePic: profile.photos[0].value 
            };
            try{
                const user = await UserModel.findOne({email: newUser.email});

                const token = user.generateJwtToken();
                if(user) { // we are finding th user exists and accessing the jwttoken so that later if the jwttoken is available the will accessing and processing it further.
                    done(null, {user, token});

                } else {
                    const user = await UserModel.create(newUser);
                }

            } catch (error) {
                done(error, null);
            }
        }

        )
    )
}