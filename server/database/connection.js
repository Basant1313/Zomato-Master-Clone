import mongoose from "mongoose";


export default async () => {
    return mongoose.connect(process.env.MONGO_URL, {
      //  setting should be configure while connecting with the database with our application -> for settings just go through the MONGODB documentation. 

        // useNewUrlParser : true,
        // useUnifiedTopology : true,
        // useCreateIndex : true,
        // useFindAndModify : false

    });
};