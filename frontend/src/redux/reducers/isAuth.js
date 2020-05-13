
export default function(state={
    isAuthLoading: false,
    isAuth: false,
    isAuthError: null
},action){
    switch(action.type){
        case 'IS_AUTH_START':  
      return {
        ...state,
        isAuthLoading: true
      };
    case 'IS_AUTH_SUCCESS':
      return {
        ...state,
        isAuthLoading: false,
        isAuthError: null,
        isAuth: true
      };
    case 'IS_AUTH_FAILURE':
      return {
        ...state,
        isAuthLoading: false,
        isAuth:null,
        isAuthError: action.payload.error
      };
    default:
      return state;
    }
}