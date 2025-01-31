import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import mongoose from "mongoose";
import nunjucks from 'nunjucks';
import Crypto from './Crypto.js';
import DateTime from './DateTime.js';

dotenvExpand.expand(dotenv.config());

export function getEnv(key , to="string"){
    switch (to) {
        case 'number':
            return toNumber(process.env[key]);
            break;
        case "bool":
            return (process.env[key] === "true") ? true : false;
            break;
        default:
            return process.env[key];
    }
}

export function toNumber(str){
    try{
        const ret = Number(str);
        return isNaN(ret) ? 0 : ret ; 
    }catch(e){
        return 0;
    }
}

export function log(obj){
    console.log(obj);
};


export function sleep(ms){
    return new Promise((resolve , reject)=>{
        setTimeout(()=>{
            resolve(true);
        }, ms)
    });
}

export function random(min , max){
    try{
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }catch(e){
        return 0;
    }
}


export function stringify(obj){
    try{
        return JSON.stringify(obj);
    }catch(e){

    }
}

export function toJSON(data) {
    try {
       return JSON.parse(data);
    }catch(e) {
       return false;
    }
}

export function isJSON(data) {
    try {
       JSON.parse(data);
    }catch(e) {
       return false;
    }
    return true;
}

export function toObjectId(str){
    try{
        if(mongoose.Types.ObjectId.isValid(str))
            return new mongoose.Types.ObjectId(str);
        else
            return "";
    }catch(e){
        return "";
    }
}


export function getpath(){
    return process.cwd() + "/";
}

export function csrf_token(req){
    try{
        const token = Crypto.hash(DateTime.getTimeStamp() + random(9999999999,100000000000000));
        req.session.csrf_token = token;
        return nunjucks.runtime.markSafe(`<input type='hidden' name='csrf_token' value='${token}'/>`);
    }catch(e){
        return '';
    }
}