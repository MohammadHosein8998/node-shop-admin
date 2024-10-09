
import BaseController from "../core/BaseController.js";
import { validationResult, body} from 'express-validator'
import { log,getEnv,random, stringify } from "../core/utils.js";
import Translate from "../core/Translate.js";
import Crypto from "../core/Crypto.js";
import DateTime from "../core/DateTime.js";;
import UserModel from './../models/user.js';


class userController extends BaseController{

    constructor(){
        super();
        this.model = new UserModel();
    }

    

}

export default userController;