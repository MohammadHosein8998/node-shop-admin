
import { MongoDB } from '../global.js';
import AdminSchema from '../schemas/admin.js';
import { log ,toObjectId } from '../core/utils.js';
import DateTime from '../core/DateTime.js';
import Crypto from '../core/Crypto.js';

class AdminModel{

    constructor(){
        this.model = MongoDB.db.model('admin', AdminSchema);
    }
    
    #hashPassword(password , admin_id){
            try{
                return Crypto.hash(admin_id + password + admin_id);
            }catch(e){
                throw Error(`hashPasssswrd Error : ${e.toString()}`);
            }
    }

    async login(email , password){
        try{
            const row = await this.model.findOne({ "email" : email});
            const result = (row === null) ? {} : row.toJSON();
            if(result?._id){
                const admin_id = result._id+'';
                if(this.#hashPassword(password , admin_id) === result.password){
                    if (result.status == 2) {
                        delete result.password;
                        return result;//login success
                    }
                    switch(result.status){
                        case 0:
                            return -2; //account is disabled
                        case 1:
                            return -3; //account is blocked
                    }
                
            
                }
                return -1 ;// wrong username or password
            }else{
                return -1 ;// wrong username or password
            }
        }catch(e){
            throw Error(`AdminModel Error : ${e.toString()}`);
        }
    }
    
    async getprofile(admin_id){
        admin_id = toObjectId(admin_id);
        if(admin_id){
            return this.model.findOne({"_id": admin_id});
        }else{
            return null;
        }
    }
    async checkEmail(email){
       return this.model.findOne({"email" : email}).countDocuments();
    }

    async saveProfile(admin_id, first_name , last_name , email, pass1 , pass2 , pass3 , avatar){
        const currentUser = await this.getprofile(admin_id);
        const data = {
            first_name , last_name
        };

        if( avatar !== ""){ 
            data['avatar'] = avatar;
        }
        
        if(currentUser?.email !== email ){
            const emailCount = await this.checkEmail(email);
            if(emailCount > 0 ){
                return -1;
            }
            data["email"] = email;
        }

        if( pass1 != "" && pass2 != "" && pass3 != ""){
            if(this.#hashPassword(pass1 , admin_id) == currentUser?.password){
                data["password"] = this.#hashPassword(pass3 , admin_id);
            }else{
                return -2 ;// wrong password
            }
        }

        await this.model.updateOne({"_id" : admin_id} , {
            "$set" : data
        });
        return 1;
    }

    async deleteAvatar(admin_id){
        const currentUser = await this.getprofile(admin_id);
        const data = {
            avatar : ""
        };

        await this.model.updateOne({"_id" : admin_id} , {
            "$set" : data
        });
        return 1;
    }

}

export default AdminModel;
