var express = require('express');
var router = express.Router();
const Add = require('../models/Add');
const validations = require('../lib/validations');
/* GET home page. */
router.get('/', async (req, res, next) => {
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
        res.locals.title = 'Nodepop a simple API exercise'; 
        res.locals.advertisements = adds;
        res.render('index');
    }catch(err){
        next(err);
        return;
    } 
});
module.exports = router;
