
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
            if(resutlogin?._id){
                req.session.admin_id = resutlogin?._id;
                req.session.admin_info = resutlogin;
                delete req.session.user_login_data;
                return res.redirect(`${getEnv('APP_URL')}`);
            }else{
                return res.redirect(`${this.#URL}login/?msg=${resutlogin}`);
            }
        }catch(e){
            return super.toError(e , req ,res);
        }
    }

    async getLogout(req ,res){
        try{
            delete req.session.admin_id;
            delete req.session.admin_info;
            req.session.destroy();
            return res.redirect(`${this.#URL}login/?msg=success-logout`)
             
        }catch(e){
            return super.toError(e , req ,res);
        }
    }

    async getProfile(req ,res){
        try{
            
            const data = {
                'title' : Translate.t('user.profile'),
                "user" : req.session.admin_info
            };
            return res.render("user/index", data);
        }catch(e){
            return super.toError(e , req ,res);
        }
    }

    async #postprofileValidation(req){
        try{
            await body('first_name').not().isEmpty().withMessage("err1")
            .run(req);
            await body('last_name').not().isEmpty().withMessage("err2")
            .run(req);
            await body('email').not().isEmpty().withMessage("err3")
            .isEmail().withMessage("err4")
            return validationResult(req)
        }catch(e){
            return {};
        }
    }

    async saveProfile(req ,res){
        try{
            const first_name = super.safeString(this.input(req.body.first_name));
            const last_name = super.safeString(this.input(req.body.last_name));
            const email = super.safeString(this.input(req.body.email));
            const result = await this.#postprofileValidation(req);
            if(!result.isEmpty()){
                return res.redirect(`${this.#URL}profile/?msg=${result?.errors[0].msg}`);   
            };
            const userResult = await this.model.saveProfile(req.session.admin_id , first_name , last_name, email);
            if(userResult == 1){
                req.session.admin_info = await this.model.getprofile(req.session.admin_id);
                log(req.session.admin_info);
                return res.redirect(`${this.#URL}profile/?msg=success`);
            }else{
                return res.redirect(`${this.#URL}profile/?msg=${userResult}`);
            }
            
        }catch(e){
            return super.toError(e , req ,res);
        }
    }


}

export default userController;