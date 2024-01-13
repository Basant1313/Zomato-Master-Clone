// env variavble -> since we are goint to use dotenv directly so we are require it . we are import it because we do not have any work of dotenv later on. dotenv is just require for cofiguration and security purpose . so that's why we are requiring it and configuring it.

require("dotenv").config();

import  express  from "express";
import  cors from "cors";
import helmet from "helmet";

// Database Connection 

import ConnectDB from "./database/connection";
// API
import Auth from "./API/Auth";
import bodyParser from "body-parser";



const zomato = express();

zomato.use(express.json());
zomato.use(express.urlencoded({extended: false}));
zomato.use(helmet());
zomato.use(cors());
zomato.use(bodyParser.json());

// For apllication routes
// localhost:4000/auth/signup  = auth api => signup -> endpoint , "/auth" -> microservice.
zomato.use("/auth" , Auth);

zomato.get("/" , (req, res) => res.json({message:"Setup Sucess Yay!!"})) 

zomato.listen(4000, () => 
ConnectDB().then ( () =>console.log("Server is  up and running")
).catch (() => console.log("DB connection failed")));

