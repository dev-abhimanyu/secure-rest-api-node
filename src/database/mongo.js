// const {MongoMemoryServer} = require('mongodb-memory-server');
const mongoose = require('mongoose');
// const {MongoClient} = require('mongodb');

let isDatabaseStarted = false;

const DB_NAME = 'apiDB';
async function startDatabase(){
    if(!isDatabaseStarted){
        mongoose.connect('mongodb://localhost:27017/' + DB_NAME)
        .then(()=>{
            console.log('CONNECTED TO MONGO!');
            isDatabaseStarted = true;
        })
        .catch((err)=>{
            console.log('ERROR! CONNECTING TO MONGO!');
            console.log(err);
        });
    }
    
    // const mongo = await MongoMemoryServer.create();
    // // await mongo.start();
    // const mongoDBURL = await mongo.getUri();
    // const connection = await MongoClient.connect(mongoDBURL, {useNewUrlParser: true});
    // database = connection.db();


}

async function getDatabase(){
    // if(!isDatabaseStarted) await startDatabase();
    // return database;
    return isDatabaseStarted;
}

module.exports = {
    startDatabase,
    getDatabase
};
