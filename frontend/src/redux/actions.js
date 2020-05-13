import axios from 'axios';

export const SearchProduct = content =>{
    return dispatch =>{
        dispatch(searchProductStarted());

        axios.post('/search',{search:content})
        .then(res=> {dispatch(searchProductSuccess(res.data))})
        .catch(err=>{dispatch(searchProductFailure(err.message))})
    }
}
export const filterProduct = (checked,id,name) =>({
  type:'FILTER_DATA',
  payload:{
    name,
    id,
    checked
  }
})


const searchProductStarted = () => ({
    type: 'SEARCH_PRODUCT'
  });

const searchProductSuccess = data => ({
    type: 'SEARCH_PRODUCT_SUCCESS',
    payload: {
      data
    }
  });

const searchProductFailure = error => ({
    type: 'SEARCH_PRODUCT_FAILURE',
    payload: {
      error
    }
  });

  export const loginUser = content =>{
    return dispatch =>{
        dispatch(loginUserStarted());
        axios.post('/login',{...content})
        .then(res=> {dispatch(loginUserSuccess(res.data))})
        .catch(err=>{dispatch(loginUserFailure(err.message))})
    }
}

const loginUserStarted = () => ({
  type: 'LOGIN_USER_START'
});

const loginUserSuccess = data => ({
  type: 'LOGIN_USER_SUCCESS',
  payload: {
    data
  }
});

const loginUserFailure = error => ({
  type: 'LOGIN_USER_FAILURE',
  payload: {
    error
  }
});



export const registerUser = content =>{
  return dispatch =>{
      dispatch(registerUserStarted());
      axios.post('/register',{...content})
      .then(res=> {dispatch(registerUserSuccess(res.data))})
      .catch(err=>{dispatch(registerUserFailure(err.message))})
  }
}


const registerUserStarted = () => ({
type: 'LOGIN_USER_START'
});

const registerUserSuccess = data => ({
type: 'LOGIN_USER_SUCCESS',
payload: {
  data
}
});

const registerUserFailure = error => ({
type: 'LOGIN_USER_FAILURE',
payload: {
  error
}
});

export const checkAuth = content =>{
  return dispatch =>{
      dispatch(checkAuthStarted());
      axios.get('/isAuth')
      .then(res=> dispatch(checkAuthSuccess(res.data)))
      .catch(err=>dispatch(checkAuthFailure(err)))
  }
};

const checkAuthStarted = () => ({
type: 'IS_AUTH_START'
});

const checkAuthSuccess = data => ({
type: 'IS_AUTH_SUCCESS',
payload:{
  data
}
});

const checkAuthFailure = error => ({
type: 'IS_AUTH_FAILURE',
payload: {
  error
}
});
export const logoutUser = () =>{
  return dispatch =>{
      dispatch(logoutUserStarted());
      axios.get('/logout')
      .then(res=> dispatch(logoutUserSuccess()))
      .catch(err=>dispatch(loginUserFailure(err)))
  }
};

const logoutUserStarted = () => ({
  type: 'LOGOUT_START'
  });
  
  const logoutUserSuccess = data => ({
  type: 'LOGOUT_SUCCESS'
  });
  
  const logoutUserFailure = error => ({
  type: 'LOGOUT_FAILURE',
  payload: {
    error
  }
  });