'use strict';
const mongoose = require('mongoose');
require('../lib/mongooseConn');
const addSchema = mongoose.Schema({
    nombre:{type:String,required: true },
    venta:{type:Boolean,required: true },
    precio:{type:Number,required: true },
    foto:String,
    tags:[String]
},{ collection: 'adds' });

addSchema.statics.list = (filter,sort,start,limit) => { 
    const query = Add.find(filter); 
    query.sort(sort); 
    query.skip(start);
    query.limit(limit);
    return query.exec();
}
const Add = mongoose.model('Add',addSchema);
module.exports = Add;