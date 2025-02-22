
import BaseController from "../core/BaseController.js";
import { validationResult, body} from 'express-validator'
import { log,getEnv,random, stringify , getpath} from "../core/utils.js";
import Translate from "../core/Translate.js";
import Crypto from "../core/Crypto.js";
import { allowImageFileUploader ,fileNameGenerator , toByte  } from "../core/uploader.js";
import DateTime from "../core/DateTime.js";;
import {FileExist, unlink} from '../core/fs.js';
import AdminModel from '../models/admin.js';



export default class categoryController extends BaseController{
    #URL = getEnv('APP_URL') + "category/";

    constructor(){
        super();
        this.model = new AdminModel();  
    }

    async add(req ,res){
        try{
            const data = {
                'title' : Translate.t('category.page_title'),
                'form_data' : req?.session?.user_login_data
            }
            return res.render("category/add", data);
        }catch(e){
            return super.toError(e , req ,res);
        }
    }

    async getIndex(req ,res){
        try{
            const data = {  
            }
            return res.render("category/index", data);
        }catch(e){
            return super.toError(e , req ,res);
        }
    }

}
