import React from 'react';
import {connect} from 'react-redux';
import {SearchProduct,checkAuth} from './redux/actions';
import {Route , Switch} from "react-router-dom";
import './App.css';
import Home from "./components/Home"
import PrivateRoute from './components/AuthRoute';
import Login from './components/Login';
import Register from './components/Register'
import Navbar from "./components/Navbar";

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {}
    this.handleSearch = this.handleSearch.bind(this)
  }
  componentDidMount(){
    this.props.checkAuth();
  }
  async handleSearch(val){
    this.props.SearchProduct(val);
  }
  render(){
  return (
    <>
      <Navbar handleSearch={this.handleSearch}/>
      <div style={{position:'relative',top:'15vh',left:'0'}}>
      <Switch>
        <Route exact path="/login" render={(renderProps)=> <Login {...renderProps}/>} />
        <Route exact path="/register" render={(renderProps) => <Register {...renderProps}/>} />        
        <Route exact path="/" render={(renderProps) => <Home handleSearch={this.handleSearch} {...renderProps}/>} />
      </Switch>
      </div>
    </>
  );
}
}

export default connect(null,{SearchProduct,checkAuth})(App);
