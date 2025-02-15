
import BaseController from "../core/BaseController.js";
import { log,getEnv} from "../core/utils.js";
import translate from "../core/Translate.js";


export default class homeController extends BaseController{
    #URL = getEnv('APP_URL') + "home/";

    constructor(){
        super();
        this.model = null;
    }
    
    async getIndex(req, res){
        try{
            
            const data ={
                "title" : translate.t("home.dashboard"),
            }
            return res.render(`home/index`, data);
        }catch(e){
            return super.toError(e , req,res);

        }
    }
    
}
