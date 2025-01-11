import { random } from "./utils.js";
import DateTime from "./DateTime.js";
import Crypto from "./Crypto.js";

export function allowImageFileUploader(mimetype){
    try{
        const mimeType = [
            {"mime_type" : "image/png" , "ext" : "png"},
            {"mime_type" : "image/jpeg" , "ext" : "jpeg"},
            {"mime_type" : "image/jpeg" , "ext" : "jpg"},
            {"mime_type" : "image/gif" , "ext" : "gif"}
        ]

        const result = mimeType.find(({mime_type})=> mime_type == mimetype);

        return result?.ext ?? "";
    }catch{
        return "";
    }    
}




export function fileNameGenerator(name , ext){
    return `${name}-` + Crypto.hash(DateTime.getTimeStamp() + random(9999999999,100000000000000) + DateTime.getTimeStamp()) + `.${ext}`
}

export function toByte(size, type){
    try{
        const types = ["B", "KB", "MB", "GB", "TB"]
        const key = types.indexOf(type.toUpperCase())
        return size * 1024 ** key;
    }catch(e){
        return 0;
    }
}