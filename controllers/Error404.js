import BaseController from "../core/BaseController.js";
import { log } from "../core/utils.js";

export default class Error404Controller extends BaseController{

    constructor(){
        super();
    }

    async handle(req,res){
        try{
            return res.status(404).render('404.html');
            // return res.status(200).render('user/404.html',{'jdia' : 'asdpoi'});
        }catch(e){
            return super.toError(e , req ,res);
        }
    }
}
