'use strict';
const validator = require('validator');
function unifyValidateFilters(requestParam){    
    const filter = {};
    if(requestParam.hasOwnProperty('sale')){        
        if(validator.isBoolean(requestParam.sale)){
            filter.venta = requestParam.sale;
        }else {
            throw {status: 422,message: {variable:'sale',reason:"parameter must be either true or false (boolean) and never empty"}}
        };           
    }
    if(requestParam.hasOwnProperty('tags')){        
        let tagsArray = requestParam.tags.split(' ');
        tagsArray.forEach((element) => {
            if(/^.*\W+.*$/.test(element)){
                throw {status: 422,message:{variable:"tags",reason:"Must be a valid string of words separated by spaces."}}
            }
        })
        filter.tags = {$all:tagsArray} ;
    } 
    if(requestParam.hasOwnProperty('name')){
        if(/^.*\W+.*$/.test(requestParam.name)){
            throw {status: 422,message:{variable:"name",reason:"Must be a valid string."}}
        }
        let regex = '.*' + requestParam.name + '.*';            
        filter.nombre = { $regex: regex, $options:"i"};                 
    } 
    if(requestParam.hasOwnProperty('price')){
        let checkPrice = requestParam.price.split('-');        
        checkPrice.forEach((element) => {            
            if(!validator.isNumeric(element) && element !== ''){
                throw {status: 422,message:{variable:"price",reason:"must be numeric."}}
            }
        })
        console.log('pepe')
        if(checkPrice.length == 2){
            if(checkPrice[0] === ''){
                filter.precio = {$lte : checkPrice[1]};
            }else if(checkPrice[1] === ''){
                filter.precio = {$gte : checkPrice[0]};
            }else{
                filter.precio = {$gte : checkPrice[0], $lte : checkPrice[1]};
            }                
        }else if(checkPrice.length == 1){
            filter.precio = requestParam.price;
        }   
    }           
    return filter;
}        
module.exports = unifyValidateFilters;