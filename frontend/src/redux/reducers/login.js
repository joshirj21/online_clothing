import {filterData} from '../selectors'

const initialState = {
    loginLoading: false,
    loginUser: '',
    loginError: null
}

export default function(state={
    loginLoading: false,
    loginUser: '',
    loginError: null
},action){
    switch(action.type){
        case 'LOGIN_USER_START':  
      return {
        ...state,
        loginLoading: true  
      };
    case 'LOGIN_USER_SUCCESS':
      return {
        ...state,
        loginLoading: false,
        loginError: null,
        loginUser: action.payload.data.email
      };
    case 'LOGIN_USER_FAILURE':
      return {
        ...state,
        loginLoading: false,
        loginUser:null,
        loginError: action.payload.error
      };
    default:
      return state;
    }
}