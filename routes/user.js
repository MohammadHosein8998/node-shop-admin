import { Router } from "express";
import userController from "../controllers/userController.js";
import authmiddleware from "../middleware/auth.js";
import { log } from "../core/utils.js";
import rateLimiterRedis from "../middleware/rateLimitter.js";


const UserController = new userController();
const route = Router();
try{
    //index
    route.get("/" ,  UserController.getIndex);
    //login
    route.get("/login" , UserController.getLogin);
    route.post("/login" , UserController.postLogin);  

}catch(e){
    route.use(UserController.errorHandling(e.toString()))
}

export default route;
