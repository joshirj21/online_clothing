
export default function(state={
    registerLoading: false,
    registerMsg: '',
    registerError: null
},action){
    switch(action.type){
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