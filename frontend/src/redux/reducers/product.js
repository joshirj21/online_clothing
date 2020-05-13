import {filterData} from '../selectors'

const initialState = {
    loading: false,
    data: [],
    error: null,
    filter:{brand:[],price:[]},
    filterData:[]
}

export default function(state=initialState,action){
    switch(action.type){
        case 'SEARCH_PRODUCT':
      return {
        ...state,
        loading: true
      };
    case 'SEARCH_PRODUCT_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
        data: [...action.payload.data]
      };
    case 'SEARCH_PRODUCT_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    case 'FILTER_DATA':
      if(action.payload.checked){
        let x = {...state.filter,[action.payload.name]:[...state.filter[action.payload.name],action.payload.id]};
      return {
        ...state,
        filterData:[...filterData([...state.data],x)],
        filter:x
      }
    }
      else if(!action.payload.checked){
         let idx = state.filter[action.payload.name].indexOf(action.payload.id)
         let arr = [...state.filter[action.payload.name]]
          arr.splice(idx,1)
          let x = {...state.filter,[action.payload.name]:[...arr]}
      return {
        ...state,
        filterData:[...filterData([...state.data],x)],
        filter:x
      }
    }
    default:
      return state;
    }
}