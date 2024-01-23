import { RestaurantModel } from "../../database/restaurant";

const Router = express.Router();

/* 
Route        /
Des          Get all Restaurant details
Params       Public
Method       GET
*/


Router.get("/" , async(req, res) => {

    try {
        const {city} = req.query;
        const restaurants = await RestaurantModel.find({city});
        return res.json({restaurants});
    }catch(error){
        return res.status(500).json({error: error.message});
    }
} );



export default Router;