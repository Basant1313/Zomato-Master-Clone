import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema ({

    users: {
        type:mongoose.Types.ObjectId,
        ref:"Users"
    },

    orderDetails: [
        {
            food: {
                type:mongoose.Types.ObjectId,
                ref: "Foods"
            } ,

            quantity: {type: Number, required: true},

            paymode: {type: String , required: true},

            status: {type: String , default:"Placed"} ,// staus is not changing like preparing , ready for delivery then default status will be taken.

            paymentDetails: {
                itemTotal : {type : Number , required: true},
                promo: {type: Number , required: true}, // we are subtracting the promo from the itemTotal and adding the tax to the item total.Promo should be the type number. We are not talking about promo code.
                tax: {type: Number, required: true}
            }
        }
    ],

    orderRatings : {
        type: Number ,
        required: true
    },

    // Suppose we have order  or  review and i recently updated my objects so i want to note the time when object was updated or something is added or deleted or anything made changes made to entire object so for we required a (TimeStamps)

   
}, {
    timestamps: true, // Suppose we have order  or  review and i recently updated my objects so i want to note the time when object was updated or something is added or deleted or anything made changes made to entire object so for we required a (TimeStamps)
}
);

export const OrderModel = mongoose.model ("Orders" , OrderSchema);