import {USER_LOGIN} from './types';
export const userlogin = (name,email)=>{
    return {
       type: USER_LOGIN,
       payload: {
        name: name,
        email: email,
        }   
    }
 }