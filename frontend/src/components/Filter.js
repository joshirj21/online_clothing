import React, { Component } from 'react';
import Form from 'react-bootstrap/Form'
import "./Filter.css"
import {getBrandNames,maxPrice} from '../redux/selectors';
import {connect} from 'react-redux';
import {filterProduct} from '../redux/actions';

class Filter extends Component{
    constructor(props){
        super(props)
        this.state = {brand:[],max:[]};
        this.handleChange = this.handleChange.bind(this)
    }
    componentDidMount(){
        let brand = getBrandNames(this.props.data);
        let max = maxPrice(this.props.data);
        this.setState({brand,max})
    }
    handleChange(evt){
        let {checked,id,name} = evt.target;
        this.props.filterProduct(checked,id,name)
    }
    render(){
        console.log(this.props)
        return(
            <div className='filter'>
                <h4 className='p-2 '>Filters</h4>
                    <div className='p-2 gender-filter'>
                    <Form>
                    <div key={`default-checkbox`} className="mb-3">
                        {['Men','Women','Boys','Girls'].map(e=>(
                          <Form.Check 
                          custom
                          name='gender'
                          type='checkbox'
                          id={e}
                          label={e}
                        />  
                        ))}
                        </div>
                    </Form>
                    </div>
                    
                    <div className='p-2 gender-filter'>
                    <h4 className='py-1'>Brand</h4>
                    <Form onChange={this.handleChange}>
                        <div key={`default-checkbox`} className="mb-3">
                            {Array.from(this.state.brand).map(m=>(
                                <Form.Check
                                custom
                                type='checkbox'
                                name='brand'
                                id={m}
                                label={`  ${m}`}
                                />
                            ))}
                        </div>
                    </Form>
                    </div>

                    <div className='p-2 gender-filter price-filter'>
                    <h4 className='py-1'>Price</h4>
                    <Form onChange={this.handleChange}>
                        <div key={`default-checkbox`} className="mb-3">
                                <Form.Check
                                custom
                                type='checkbox'
                                name='price'
                                id={'first'}
                                label={`  Rs. 0 to Rs. ${this.state.max / 3 }`}
                                />

                                <Form.Check
                                custom
                                type='checkbox'
                                name='price'
                                id={'second'}
                                label={`  Rs. ${this.state.max} to Rs.${this.state.max / 3 * 2}`}
                                />

                                <Form.Check
                                custom
                                type='checkbox'
                                name='price'
                                id={'third'}
                                label={`  Rs.${this.state.max /3 *2} to Rs. ${this.state.max}`}
                                />
                        </div>
                    </Form>
                    </div>
                </div>
        )
    }
}
const mapStateToProps = state =>{
    const {data} = state.product;
    return {data};
}

export default connect(mapStateToProps,{filterProduct})(Filter)