import autoBind from "auto-bind";
import {encode} from 'html-entities';
import { getEnv, log, toNumber } from "./utils.js";

export default class BaseController{

    constructor(){
        if(this.constructor === BaseController){
            throw new Error("this is an abstarct class and cant have instance");
        }
        autoBind(this);
    }
    
    input(feild){
        try{
            if(!Array.isArray(feild)){
                if(typeof feild === 'string'){
                    return feild.trim();
                }else{
                    return '';
                }
            }else{
                return '';
            }
        }catch(e){
            return '';
        }
    }


    errorHandling(error){
        try{
            const debug = getEnv('DEBUG' , 'bool');
            log(debug)
            return async (req, res , next) => {
                if(debug){
                    return res.status(500).render('500', {'error' : error.toString()});
                }
                else{
                    return res.status(500).render('500' , {'error' : "Internal server Error"});
                }
            }
        }catch(e){
            log(`ERROR on : BaseController : errorHandling ${e.toString()}`);
            throw e;
        }
}

    toError(err , req ,res){
        const debug = getEnv('DEBUG' , 'bool');
        try{
            if(debug){
                // res.status(500).send("hello fucker");
                res.status(500).render('500',{"error": err.toString()});
            }
            else{
                return res.status(500).render('500',{"error": 'Internal server Error'});
            }
        }catch(e){
            if(debug){
                return res.status(500).render('500',{"error": e.toString()});
            }
            else{
                return res.status(500).render('500',{"error": 'Internal server Error'});
            }
        }
    }

    safeString(str){
        try{
            return encode(str , {mode: 'specialChars'});
        }catch(e){
            return "";
        }
    }

    toNumber(num){
        try{
            return toNumber(num);   
        }catch(e){
            return 0;
        }
    }
}