import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema ({

    food: {
        // for which food you are giving review so it should be. so that why we are refeering food schema
        type: mongoose.Types.ObjectId,
        ref:"Foods"
    },

    // for which restaurant you are review
    restaurant: {
        type:mongoose.Types.ObjectId,
        ref:"Restaurants"
    },


    // who is giving review
    user : {
        type: mongoose.Types.ObjectId,
        ref:"Users"
    },
    rating : {
        type: Number, 
        required: true
    },

    reviewText: {
        type: String,
        required: true
    },

    photos: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Images"
        }
    ]

},{
    timestamps: true,
});

export const ReviewModel = mongoose.model ("Reviews" , ReviewSchema);