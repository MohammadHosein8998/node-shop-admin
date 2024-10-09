import { Router } from "express";
import userRoute from './user.js';



const route = Router();
try{
    route.use('/user/',userRoute);
}catch(e){
    console.log(e.toString());
}   

export default route;