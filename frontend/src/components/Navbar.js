import React, { Component } from 'react';
import {connect} from 'react-redux';
import "./Navbar.css";
import {logoutUser} from '../redux/actions';
import {NavLink,withRouter} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


class Navbar extends Component{
    constructor(props){
        super(props);
        this.state = {search:'',anchorEl:null};
        this.handleSearch = this.handleSearch.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }
    handleChange(evt){
        this.setState({search:evt.target.value})
    }
    handleSearch(){ 
        this.props.handleSearch(this.state.search)
        this.props.history.push('/');
    }
    handleClick(evt){
        this.setState({anchorEl:evt.currentTarget})
    }
    async handleClose(evt){
        this.setState({anchorEl:null})
        if(evt.target.textContent === 'Logout'){
            await this.props.logoutUser();
            this.props.history.push('/login');
        }
    }
    render(){
        return(
            <div className='navbar'>
                <div className='navbar-left'>
                    <div className='navbar-items logo'></div>
                    <div className='navbar-items'>men</div>
                    <div className='navbar-items'>women</div>
                    <div className='navbar-items'>kids</div>
                    <div className='navbar-items'>Discover</div>
                </div>
                <div className='navbar-right'>
                    <div className='navbar-items navbar-search'>
                        <i className="fas fa-search" onClick={this.handleSearch}></i>&nbsp;&nbsp;&nbsp;&nbsp;
                        <input id='navbar-search-input' value={this.state.search} type='text' placeholder='Search for products, brands and more' onChange={this.handleChange}/>
                    </div>
                    {this.props.loginUser ? 
                    <div className='navbar-items'>
                    <Button aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleClick}>
                      {this.props.loginUser}
                    </Button>
                    <Menu
                      id="simple-menu"
                      anchorEl={this.state.anchorEl}
                      keepMounted
                      open={Boolean(this.state.anchorEl)}
                      onClose={this.handleClose}
                    >
                      <MenuItem onClick={this.handleClose}>My Profile</MenuItem>
                      <MenuItem onClick={this.handleClose}>Orders</MenuItem>
                      <MenuItem onClick={this.handleClose} name='out'>Logout</MenuItem>
                    </Menu>
                  </div>
                    : <div className='navbar-items' ><NavLink to='/login'>Login</NavLink></div>}
                    <div className='navbar-items'>Wishlist</div>
                    <div className='navbar-items'>Bag</div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state =>{
    const {loginUser} = state.auth;
    return {loginUser};
}

export default connect(mapStateToProps,{logoutUser})(withRouter(Navbar));