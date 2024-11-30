import { Router } from "express";
import homeController from "../controllers/homeController.js";
import userController from "../controllers/userController.js";
import rateLimiterRedis from "../middleware/rateLimitter.js";
import authmiddleware from "../middleware/auth.js";
import { log } from "../core/utils.js";


const Controller = new homeController();
const route = Router();
try{
    route.get("", new authmiddleware().needAuth , Controller.getIndex);
}catch(e){
    route.use(Controller.errorHandling(e.toString()));
}

export default route;
