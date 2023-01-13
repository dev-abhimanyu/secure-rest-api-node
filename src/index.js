const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helment = require('helmet');
const morgan = require('morgan');

const PORT = 3001;

// defining the Express app
const app = express();

// defning an array to work as the database
const ads = [
    {title : 'hello, world (again)!'}
]

// adding helmet to enhance REST API's security
app.use(helment());
// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser());
// enabling CORS for all requests
app.use(cors());
// adding morgan to log HTTP requests
app.use(morgan());


// defining endpoint to return data
app.get('/', (req,res) => {
    res.send(ads);
})

app.listen(PORT, () => {
    console.log('Listening on port ', PORT);
})