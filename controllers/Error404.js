import { query } from "express";
import BaseController from "../core/BaseController.js";
import { log } from "../core/utils.js";

class Error404Controller extends BaseController{

    constructor(){
        super();
    }

    async handle(req,res){
        try{
            return res.status(404).send('404 page not found!');
            // return res.status(200).render('user/404.html',{'jdia' : 'asdpoi'});
        }catch(e){
            return super.toError(e, req ,res);
        }
    }
}

export default Error404Controller;