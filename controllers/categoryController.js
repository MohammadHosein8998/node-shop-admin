
import BaseController from "../core/BaseController.js";
import { log,getEnv,random, stringify , getpath} from "../core/utils.js";
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
                'form_data' : req?.session?.user_login_data
            }
            return res.render("category/index", data);
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
