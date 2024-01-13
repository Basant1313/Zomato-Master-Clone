
// Here we are basically import all of our models and then export and whereever we are creating index.js file in which so ever API file or inside our main file we will importing this allModels only and whatever model we required there we will be able to fetch them. we will basically destructure our entire imported model from allModels and we can use model which ever we required as per our requirements.

// we are other API likee food we will required more than one Model so that time so that time we cannot sit and figure out which what mdoel i required and that particular model i will be importing. so it basically a good practice to import all Models inside one file and then import this file where we required any model.

import {FoodModel} from "./food";
import {ImageModel} from "./image";
import {MenuModel} from "./menu";
import { OrderModel } from "./order";
import {RestaurantModel} from "./restaurant";
import {ReviewModel} from "./reviews";
import {UserModel} from "./users";


export {
    FoodModel,
    ImageModel,
    MenuModel,
    OrderModel,
    RestaurantModel,
    ReviewModel,
    UserModel
};