import { Router } from "express";
import userController from "../controllers/userController.js";
import authmiddleware from "../middleware/auth.js";
import { log } from "../core/utils.js";
import rateLimiterRedis from "../middleware/rateLimitter.js";


const Controller = new userController();
const route = Router();
try{
    //login
    route.get("/login", new authmiddleware().isAuth , Controller.getLogin);
    route.post("/login", new authmiddleware().isAuth , Controller.postLogin);  
    route.get("/logout", new authmiddleware().needAuth , Controller.getLogout);  

}catch(e){
    route.use(Controller.errorHandling(e.toString()))
}

export default route;
