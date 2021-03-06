'use strict';
const mongoose = require('mongoose');
mongoose.connection.on('error',err => {
    console.log('Connection error: ', err);
    process.exit(1);
});
mongoose.connection.once('open', () => {
    console.log('Succesfull connection to mongodb ', mongoose.connection.name);
});
mongoose.connect('mongodb://localhost/nodepop',{useNewUrlParser:true});
module.exports = mongoose.connection;
