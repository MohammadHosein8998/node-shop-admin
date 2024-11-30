import BaseMiddleware from "../core/BaseMiddleware.js";
import { getEnv, log } from "../core/utils.js";




export default class authMidlleware extends BaseMiddleware {
   
   constructor(){
      super();
   }
   
   async isAuth(req,res,next){
      try{
         log('isAuth is call');
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
         log('needAuth is call');
         if(req?.session?.admin_id){
            next();
         }else{
            return res.redirect(`${getEnv('APP_URL')}user/login?msg=no_access`);
        }
      }catch(e){
         return super.toError(e, req ,res);
         
      }
   }
}
