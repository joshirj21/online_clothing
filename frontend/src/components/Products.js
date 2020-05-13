import React, { Component } from 'react';
import "./Products.css";
import Filter from "./Filter";

class Products extends Component{
    constructor(props){
        super(props);
        this.state = {clear:''};
        this.handleRemoveHover = this.handleRemoveHover.bind(this)
    }
    handleHover(evt,i){
        let x = evt.target.parentNode.children[0];
        let idx = 0;
        let clear = setInterval(()=>{
            if(idx > this.props.data[i].media.standard.length-1)
            idx = 0;
            x.src = this.props.data[i].media.standard[idx].url
            idx++;
        },1000);
        this.setState({clear:clear})
    }
    handleRemoveHover(){
        clearInterval(this.state.clear)
    }
    render(){
        return(
            <div style={{position:'relative',left:'0',zIndex:'99'}}>
                <Filter />
                <div className='main'>
                    <div className='grid-container'>
                        {this.props.data.map((d,i)=> (
                        <div className={`grid-item grid-item-${i}`} onMouseOver={(evt)=>this.handleHover(evt,i)} onMouseOut={this.handleRemoveHover}>
                            <img className='tiles' src={d.media.standard[0].url}/>
                        <div className='tiles-info p-3' style={{lineHeight:'10px'}}>
                        <span className='cart mb-3'>Add to cart</span>
                                <p><strong>{d.brand.name.length > 20 ? `${d.brand.name.substring(0,20).toUpperCase()}..` : d.brand.name}</strong></p>
                                <p style={{fontSize:'14px'}}>{d.name.substring(0,28)}...</p>
                        <p><strong>RS. {d.price.offer_price.value} </strong>
                        {d.discount === 0 ? null : <><span style={{textDecoration:'line-through',fontSize:'12px'}}>RS. {d.price.basket_price.value}</span><span style={{color:'#FEA774',fontSize:'12px'}}>({d.discount.toFixed(1)}% OFF)</span></>}
                        </p>
                            </div>
                        </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}

export default Products;