const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helment = require('helmet');
const morgan = require('morgan');
const {startDatabase, getDatabase} = require('./database/mongo');
const {insertData, getAllData} = require('./database/crud');
const methodOverride = require('method-override');

const PORT = 3001;

// defining the Express app
const app = express();

app.use(methodOverride('_method'));
app.use(express.urlencoded({extended: true})); //needed for body-parsing of post request-parses the form data

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
    console.log("GET called!!");
    let data = await getAllData();
    console.log(data);
    res.send(data);
});

app.post('/', async(req, res) => {
    // console.log("POST called!!");
    await insertData(req);
    res.redirect("/");
})


// start the MongoDB instance
startDatabase().then(async() =>{

    // start the server
    app.listen(PORT, async() => {
        console.log('Listening on port ', PORT);
    });
});

