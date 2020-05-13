import React, { Component } from 'react';
import "./Home.css"
import Products from "./Products"
import Navbar from "./Navbar"
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {filterData} from '../redux/selectors'

class Home extends Component{
    constructor(props){
        super(props);
        this.state = {}
    }
    render(){
        return(
            <div>
                {this.props.data.length ? <Products data={this.props.filterData.length ? this.props.filterData: this.props.data}/> : null}
            </div>
        )
    }
}

const mapStateToProps = state =>{
    const {data,filterData} = state.product;
    return {data,filterData};
}

export default connect(mapStateToProps,null)(Home);