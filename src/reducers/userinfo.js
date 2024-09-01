import {USER_LOGIN,USER_LOGOUT} from '../actions/types';

const initialState = {
     name :'',
     email:''
};

const userinfo =(state= initialState,action) =>
{
    switch(action.type){
        case USER_LOGIN:
            return{
                name : action.payload.name,
                email : action.payload.email    
            };
        case USER_LOGOUT :
            return initialState;
        default:
            return state;
    }
};
export default userinfo;
