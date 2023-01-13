const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helment = require('helmet');
const morgan = require('morgan');
const {startDatabase} = require('./database/mongo');
const {insertAd, getAds} = require('./database/ads');

const PORT = 3001;

// defining the Express app
const app = express();

// adding helmet to enhance REST API's security
app.use(helment());
// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());
// enabling CORS for all requests
app.use(cors());
// adding morgan to log HTTP requests
app.use(morgan('combined'));


// defining endpoint to return data
app.get('/', async(req,res) => {
    res.send(await getAds);
})

// start the in-memory MongoDB instance
startDatabase().then(async() =>{
    
    await insertAd({title: 'Hello, now from the in-memory database!'});

    // start the server
    app.listen(PORT, async() => {
        console.log('Listening on port ', PORT);
    });
});

