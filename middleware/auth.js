import BaseMiddleware from "../core/BaseMiddleware.js";
import { getEnv, log } from "../core/utils.js";




export default class authMidlleware extends BaseMiddleware {
   
   constructor(){
      super();
   }
   
   async isAuth(req,res,next){
      try{
         if(req?.session?.admin_id){
            return res.redirect(`${getEnv('APP_URL')}`);
        }else{
            next()
        }
      }catch(e){
         return super.toError(e, req ,res);
         
      }
   }
   async needAuth(req,res,next){
      try{
         if(req?.session?.admin_id){
            req.app.locals.admin_info = req.session.admin_info;
            next();
         }else{
            return res.redirect(`${getEnv('APP_URL')}user/login?msg=no_access`);
        }
      }catch(e){
         return super.toError(e, req ,res);
         
      }
   }
}
