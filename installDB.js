'use strict';
const readline = require('readline');
const db = require('./lib/mongooseConn');
const Add = require('./models/Add');
const addsData = require('./data/adds.json');

async function initAdds(){
    const deleted = await Add.deleteMany();
    console.log(`Deleted ${deleted.n} adds `, deleted);
    const insertAdds = await Add.insertMany(addsData);
    console.log(`Inserted ${insertAdds.length} adds`);
 };
 function askUser(question){
    return new Promise((resolve,reject) => {
        const dialog = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        dialog.question(question, answer => {
            dialog.close();
            resolve(answer);
            return;
        });
    });
 }
//console.log(addsData);
db.once('open', async () =>{
    try {
        const response = await askUser('Are you sure you want to delete the whole database? (no/yes)');        
        if(response.toLowerCase() !== 'yes'){
            console.log('Procedure aborted by user');
            process.exit(0);
        }
        console.log(response);
        await initAdds();
        db.close();
    }catch(err){
        console.log('Found error ', err);
        process.exit(1);
    }    
});