export const getBrandNames = data =>{
    let x = data.map(d=> d.brand.name);
    return new Set([...x]);
}

export const maxPrice = data =>{
    let y = data.map(m=>m.price.offer_price.value);
        return y.reduce((accumulator,currentValue,idx)=> {
            if(idx === 0){
            accumulator = currentValue;
            return accumulator        
            }
            else
            return Math.max(accumulator,currentValue)
        })
}

export const filterData = (data,filter)=>{
    
    let newArr = [];
    let cond = Object.keys(filter).filter(f=> filter[f].length > 0).length;
    if(cond !== 0){
        data.forEach(d=>{
            filter.brand.forEach(f=>{
                if(f.trim() === d.brand.name.trim())
                newArr.push(d)
            })
        })
    }
    return newArr;
}