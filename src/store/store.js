
import {configureStore} from '@reduxjs/toolkit';
import userInfoReducer from '../reducers/userinfo';
const store =  configureStore({
    reducer: { userinfo: userInfoReducer},
  })

  export default store; 
  