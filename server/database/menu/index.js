import mongoose from "mongoose";

const MenuSchema = new mongoose.Schema ({

    // menus is an array foods
    menus: [
        {
            name: {type : String , required: true},
            items: [
                {
                    // here already have food schema decided are we basically refering to that 
                    type: mongoose.Types.ObjectId,
                    ref: "Foods"
                }
            ]


        }
    ],

    recommended: [
        
        {
            type : mongoose.Types.ObjectId,
            ref: "Foods",
            unique: true // we cannot allow the restaurant should recommened same food thousand times so whenever any recommendation is made the array should have unique object inside it. 

       }
    ]
},{
    timestamps: true,
});

export const MenuModel = mongoose.model ("Menus" , MenuSchema);
