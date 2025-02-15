import { Router } from "express";
import categoryController from "../controllers/categoryController.js";
import authmiddleware from "../middleware/auth.js";
import { log } from "../core/utils.js";


const Controller = new categoryController();
const route = Router();
try{
    route.get("/", new authmiddleware().needAuth , Controller.getIndex);
    route.get("/add", new authmiddleware().needAuth , Controller.add);
}catch(e){
    route.use(Controller.errorHandling(e.toString()));
}

export default route;
