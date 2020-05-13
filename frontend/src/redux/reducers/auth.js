let obj = {
    loginLoading: false,
    loginUser: '',
    loginError: null,
    logoutLoading: false,
    logoutError: null,
    isAuthLoading: false,
    isAuthError: null,
    registerLoading: false,
    registerMsg: '',
    registerError: null
}
export default function(state=obj,action){
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

        case 'LOGOUT_START':  
            return {
                ...state,
                logoutLoading: true  
            };
        case 'LOGOUT_SUCCESS':
            return {
                ...state,
                loginUser:null,
                logoutLoading: false,
                logoutError: null,
            };
        case 'LOGOUT_FAILURE':
            return {
                ...state,
                logoutLoading: false,
                logoutError: action.payload.error
            };

        case 'IS_AUTH_START':  
            return {
                ...state,
                isAuthLoading: true
            };
        case 'IS_AUTH_SUCCESS':
            return {
                ...state,
                isAuthLoading: false,
                loginUser:action.payload.data.email,
                isAuthError: null
            };
        case 'IS_AUTH_FAILURE':
            return {
                ...state,
                isAuthLoading: false,
                isAuthError: action.payload.error
            };


        case 'REGISTER_USER_START':
            return {
                ...state,
                registerLoading: true
            };
        case 'REGISTER_USER_SUCCESS':
            return {
                ...state,
                registerLoading: false,
                registerError: null,
                registerMsg: action.payload.data
            };
        case 'REGISTER_USER_FAILURE':
            return {
                ...state,
                registerLoading: false,
                registerMsg:null,
                registerError: action.payload.error
            };
        default:
            return state;
    }
}