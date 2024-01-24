import { RestaurantModel } from "../../database/restaurant";

const Router = express.Router();

/* 
Route        /
Des          Get all Restaurant details
Params       None
Access       Public
Method       GET
*/


Router.get("/" , async(req, res) => {

    try {
        const {city} = req.query; // search part which is visible in google search bar i.e (search q = )

        // find all restaurant in an particular city 
        const restaurants = await RestaurantModel.find({city});
        return res.json({restaurants});
    }catch(error){
        return res.status(500).json({error: error.message});
    }
} );


/* 
Route        /
Des          Get paticular Restaurant details on id
Params       _id
Access       Public
Method       GET
*/


// why colon (:) -> because id part dynamically changing
Router.get("/:_id" , async(req  , res ) => {

    try {
        const {_id} = req.params;
        const restaurant = await RestaurantModel.findOne(_id);


        if(!restaurant) 
            res.status(400).json({error: "Restaurant not Found!"});
        

        return res.json({restaurant});
    } catch(error) {
        return res.status.json(500).json({error: error.message});
    }

} );

/* 
Route        /search
Des          Get  Restaurant details on search
Params       NONE
Body         searchString
Access       Public
Method       GET
*/

Router.get("/search" , async(req, res) => {

    try{

        const{searchString} = req.body;

        const restaurants = await RestaurantModel.find({
            name: {$regex: searchString, $options: "i"} //regex is basically whenever you give any of the pattern or any of the keyword inside searchString. suppose we have a pattern ("xxxxxyyyyzzzz") . so if we subString (yyyyzzz) we are searching for regex will go and find that particular restaurant which have these particular subString inside their name.

            // $options: "i" means it should be case insensitive.

        });  // we are using findOne because the keyword like burgerking , burgerbite so if we search for burger so it will search all restaurant having burger keyword.
        
        return res.json({restaurants});

    }catch(error) {
        return res.status(500).json({error: error.message});
    }

} );



export default Router;