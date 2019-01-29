'use strict';
const express = require('express');
const router = express.Router();
const Add = require('../models/Add');
const validations = require('../lib/validations');
router.get('/',async (req,res,next) => {  
    try {         
        const filters = validations(req.query);
        const start = parseInt(req.query.start);
        const limit = parseInt(req.query.limit);  
        const sort =  req.query.sort;     
        let sortHow='';
        if(sort){
            let asc=1;
            if(desc == 1)asc=-1;
            sortHow = [[sort,asc]];
        }  
        const adds = await Add.list(filters,sortHow,start,limit); 
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

