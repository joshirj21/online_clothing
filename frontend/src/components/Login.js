import React, { Component } from 'react';
import {loginUser} from '../redux/actions';
import {connect} from 'react-redux';

class Login extends Component{
    constructor(props){
        super(props);
        this.state = {email:'',password:''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(evt){
        this.setState({[evt.target.name]:evt.target.value})
    }
    async handleSubmit(evt){
        evt.preventDefault();
        await this.props.loginUser(this.state); 
        this.props.history.push('/');
    }
    render(){
        return(     
        <>
        <h1>Login Form</h1>
            <form onSubmit={this.handleSubmit}>
                <input type='name' name='email' value={this.state.email} onChange={this.handleChange}/>
                <input type='password' name='password' value={this.state.password} onChange={this.handleChange}/>
                <button>Submit</button>
            </form>
        </>
        )
    }
}

export default connect(null,{loginUser})(Login);