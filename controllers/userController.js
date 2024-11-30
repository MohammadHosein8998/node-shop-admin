
import BaseController from "../core/BaseController.js";
import { validationResult, body} from 'express-validator'
import { log,getEnv,random, stringify } from "../core/utils.js";
import Translate from "../core/Translate.js";
import Crypto from "../core/Crypto.js";
import DateTime from "../core/DateTime.js";;
import AdminModel from '../models/admin.js';


class userController extends BaseController{
    #URL = getEnv('APP_URL') + "user/";

    constructor(){
        super();
        this.model = new AdminModel();
    }

    async getLogin(req ,res){
        try{
            const data = {
                'form_data' : req?.session?.user_login_data
            }
            return res.render("user/login", data);
        }catch(e){
            return super.toError(e , req ,res);
        }
    }

    async #loginValidation(req){
        try{
            await body('email').not().isEmpty().withMessage("err1")
            .isEmail().withMessage("err2")
            .run(req);
            await body('password').not().isEmpty().withMessage("err3")
            .run(req);
            return validationResult(req)
        }catch(e){
            return {};
        }
    }

    async postLogin(req ,res){
        try{
            const email = super.safeString(this.input(req.body.email));
            const password = this.input(req.body.password);
            const data = {email};
            req.session.user_login_data = data;
            const result = await this.#loginValidation(req);
            if(!result.isEmpty()){
                return res.redirect(`${this.#URL}login/?msg=${result?.errors[0].msg}`);
            };
            const resutlogin = await this.model.login(email , password);
            if(typeof resutlogin === "string"){
                req.session.admin_id = resutlogin;
                delete req.session.user_login_data;
                return res.redirect(`${getEnv('APP_URL')}`);
            }else{
                return res.redirect(`${this.#URL}login/?msg=${resutlogin}`);
            }
        }catch(e){
            return super.toError(e , req ,res);
        }
    }
}

export default userController;