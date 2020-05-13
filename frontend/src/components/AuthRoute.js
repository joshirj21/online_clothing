import React from 'react';
import {Route,Redirect} from 'react-router-dom'
import {connect} from "react-redux";

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        rest.loginUser === true ?
         <Component {...props} />:
          <Redirect to="/login"/>
    )} />
  )
  const mapStateToProps = (state)=>{
    const {loginUser} = state.login;
    return {loginUser};
  }

export default connect(mapStateToProps,null)(PrivateRoute);
// const PrivateRoute = ({ component: Component, ...rest }) => (
//     <Route {...rest} render={} />
//   )