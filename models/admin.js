
import { MongoDB } from '../global.js';
import AdminSchema from '../schemas/admin.js';
import { log ,toObjectId } from '../core/utils.js';
import DateTime from '../core/DateTime.js';
import Crypto from '../core/Crypto.js';

class AdminModel{

    constructor(){
        this.model = MongoDB.db.model('admin', AdminSchema);
    }
    
    #hashPassword(password , user_id){
            try{
                return Crypto.hash(user_id + password + user_id);
            }catch(e){
                throw Error(`hashPasssswrd Error : ${e.toString()}`);
            }
    }

    async login(email , password){
        try{
            const result = await this.model.findOne({ "email" : email});
            if(result?._id){
                const user_id = result._id+''
                if(this.#hashPassword(password , user_id) === result.password){
                    if (result.status == 2) {
                        return result;//login success
                    }
                    switch(result.status){
                        case 0:
                            return -2; //account is disabled
                        case 1:
                            return -3; //account is blocked
                            
                    }
    
                }else{
                    return -1 // wrong username or password
                }
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
        }this.model
    }
    async checkEmail(email){
       return this.model.findOne({"email" : email}).countDocuments();
    }

    async saveProfile(admin_id, first_name , last_name , email){
        const currentUser = await this.getprofile(admin_id);
        const data = {
            first_name , last_name
        };
        
        if(currentUser?.email !== email ){
            const emailCount = await this.checkEmail(email);
            if(emailCount > 0 ){
                return -1;
            }
            data["email"] = email;
            
        }

        await this.model.updateOne({"_id" : admin_id} , {
            "$set" : data
        });
        return 1;
    }

}

export default AdminModel;
