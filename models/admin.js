
import { MongoDB } from '../global.js';
import AdminSchema from '../schemas/admin.js';
import { log } from '../core/utils.js';
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
                        return user_id;
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

}

export default AdminModel;
