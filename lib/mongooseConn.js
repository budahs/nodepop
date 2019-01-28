'use strict';
const mongoose = require('mongoose');
mongoose.connection.on('error',err => {
    console.log('Connection error: ', err);
    process.exit(1);
});
mongoose.connection.once('open', () => {
    console.log('Succesfull connection to mongodb ', mongoose.connection.name);
});
mongoose.connect('mongodb://nodepopAdmin:7B4nmrcj@31.200.243.156:30017/nodepop',{useNewUrlParser:true});
module.exports = mongoose.connection;
