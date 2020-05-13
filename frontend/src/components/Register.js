import React, { Component } from 'react';
import {registerUser} from '../redux/actions'
import {connect} from 'react-redux';

class Register extends Component{
    constructor(props){
        super(props);
        this.state = {email:'',password:''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(evt){
        this.setState({[evt.target.name]:evt.target.value})
    }
    handleSubmit(evt){
        evt.preventDefault();
        this.props.registerUser(this.state);
        this.props.history.push('/login');
    }
    render(){
        return(
            <>
            <h1>Register Form</h1>
                <form onSubmit={this.handleSubmit}>
                    <input placeholder='Username' type='name' name='email' value={this.state.email} onChange={this.handleChange}/>
                    <input placeholder='password' type='password' name='password' value={this.state.password} onChange={this.handleChange}/>
                    <button>Submit</button>
                </form>
            </>
        )
    }
}
export default connect(null,{registerUser})(Register);