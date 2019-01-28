'use strict';
const express = require('express');
const validator = require('validator');
const router = express.Router();
const Add = require('../models/Add');
router.get('/',async (req,res,next) => {  
    try { 
        const nombre = req.query.name;
        const precio = req.query.price;
        const sort = req.query.sort;
        const venta = req.query.sale;
        const tags = req.query.tags;
        const start = parseInt(req.query.start);
        const limit = parseInt(req.query.limit);
        const desc = req.query.desc;
        const filter = {};        
        if(nombre){
            let regex = '.*' + nombre + '.*';            
            filter.nombre = { $regex: regex, $options:"i"};            
        } 
        if(precio){
            let checkPrice = precio.split('-');
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
        if(venta){
            if(validator.isBoolean(venta)){
                filter.venta = venta;
            }            
        }
        if(tags){
            let tagsArray = tags.split(' ');
            filter.tags = {$all:tagsArray} ;
        }  
        let sortHow='';
        if(sort){
            let asc=1;
            if(desc == 1)asc=-1;
            sortHow = [[sort,asc]];
        }     
        const adds = await Add.list(filter,sortHow,start,limit); 
        res.json({success:true,results: adds});
    }catch(err){
        next(err);
        return;
    }    
});
router.post('/',async (req,res,next) => {
    try{
        const data = req.body;
        const add = new Add(data);
        const savedAdd = await add.save();
        res.json({success: true, result: savedAdd});
    }catch(err){
        next(err);
        return;
    }
});
router.get('/:id', async (req,res,next) => {
    try{
        const id = req.params.id;
        const add = await Add.findById(id).exec();
        res.json({success: true, result: add});
    }catch (err){
        next(err);
        return;
    }
});
router.delete('/:id',async (req,res,next) => {
    try{
       const id = req.params.id;    
       await Add.deleteOne({_id:id}).exec();
       res.json({success: true});
    }catch(err){
        next(err);
        return;
    } 
});
module.exports = router;

