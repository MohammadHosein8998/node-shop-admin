
import BaseController from "../core/BaseController.js";
import { validationResult, body} from 'express-validator'
import { log,getEnv,random, stringify } from "../core/utils.js";
import Translate from "../core/Translate.js";
import Crypto from "../core/Crypto.js";
import DateTime from "../core/DateTime.js";;
import AdminModel from '../models/admin.js';


class homeController extends BaseController{
    #URL = getEnv('APP_URL') + "home/";

    constructor(){
        super();
        this.model = null;
    }
    
    async getIndex(req, res){
        try{
            const data ={

            }
            return res.render(`home/index`, data);
        }catch(e){
            return super.toError(e , req,res);

        }
    }
    
}

export default homeController;