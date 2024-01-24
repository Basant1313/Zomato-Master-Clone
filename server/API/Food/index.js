import express from "express";


//Database Model 
import { FoodModel } from "../../database/allModels";

const Router = express.Router();


/* 
Route        /
Des          Get all the food based on particular restaurant
Params       _id
Access       Public
Method       GET
*/

Router.get ("/:_id" , async(req, res) => {

    try{

        const {_id} = req.params;
        const foods = await FoodModel.find({restaurant: _id}) // trying to find the food of that particular restaurant.

        return res.json({foods});

    }catch(error){

       return  res.status(500).json({error: error.message});

    }
});

/* 
Route        /r
Des          Get all the food based on particular category
Params       category
Access       Public
Method       GET
*/

Router.get ("/r/:category" , async(req , res) => {

    try{
        const {category} =  req.params;
        const foods = await FoodModel.find({
            category: {$regex: category , $options: "i"} //  regex is not mandatory here but why not if user search sometime which is not to the point it is having substring which is matching the substring available in the category. so its is convient to use regex.
        });

        return res.json({foods})

    }catch(error){
        return res.status(500).json({error: error.message});
    }
});


export default Router;