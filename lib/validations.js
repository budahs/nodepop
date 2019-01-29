'use strict';
const validator = require('validator');
function unifyValidateFilters(requestParam){    
    const filter = {};
    if(requestParam.sale){
        if(validator.isBoolean(requestParam.sale)){
            filter.venta = requestParam.sale;
        }            
    }
    if(requestParam.tags){        
        let tagsArray = requestParam.tags.split(' ');
        filter.tags = {$all:tagsArray} ;
    } 
    if(requestParam.name){
        let regex = '.*' + requestParam.name + '.*';            
        filter.nombre = { $regex: regex, $options:"i"}; 
        console.log(filter.nombre);           
    } 
    if(requestParam.precio){
        let checkPrice = requestParam.precio.split('-');
        if(checkPrice.length == 2){
            if(checkPrice[0] === ''){
                filter.precio = {$lte : checkPrice[1]};
            }else if(checkPrice[1] === ''){
                filter.precio = {$gte : checkPrice[0]};
            }else{
                filter.precio = {$gte : checkPrice[0], $lte : checkPrice[1]};
            }                
        }else if(checkPrice.length == 1){
            filter.precio = precio;
        }   
    }           
    return filter;
}        
module.exports = unifyValidateFilters;