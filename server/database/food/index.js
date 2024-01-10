import mongoose from "mongoose";


const FoodSchema = new mongoose.Schema ({

    name : {type : String , required : true },
    descript : {type : String , required : true},
    isVeg: {type : Boolean , required : true},
    isContainsEgg : {type: Boolean , required : true },
    category : {type : String , required : true},
    photos :{
        // when we taking reference from another schema then this particular schema is called as referencing schema and the original schema is called as referenced schema in terms of SQL;

        // when we taking reference from another table(base table) then this particular table is called as referencing table and the original table is called as referenced table in terms of SQL;

        // apart from that we have to tell im having my own key-value pairs but i will take reference from other schema from the other table (basically linking to other table by having unique id -> concept of primary key and foreign key ) 
        
        //either i can assign primary key to our database(schema)or just to make things easier mongoose has its own ids.

        // in real life example or production level we will never get any database which is having solely one database . 

        // we are linking some tables using primary key - which is basically used for linking .

        // in SQL in schema structured we have (AI) -> auto increment and it will assign us the primary key and they will increment it whenever we add the new entity inside that.

        // in mongoose we are having unique object id and using this we will be refering to other schema or table whatever schema or table we want to refer to.

        type : mongoose.Types.ObjectId, // predefined
        ref: "Images" // schema name = "Images";

    },

    price: {type: Number , default : 150 , required: true}, // if any particular food price is not assigned then by default it will assign 150.


    // addOns like coke , donut etc.
    addOns: [
        {
            types: mongoose.Types.ObjectId,
            ref: "Foods" // self referencing
        }
    ],

    //for each we have one resturant.
    restaurant : {
        type: mongoose.ObjectId,
        ref: "Restaurants",
        required: true
    }

},{
    timestamps: true,
});

export const FoodModel = mongoose.model ("Foods" , FoodSchema);