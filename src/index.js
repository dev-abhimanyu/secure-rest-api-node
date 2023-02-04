const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helment = require('helmet');
const morgan = require('morgan');
const {startDatabase, getDatabase} = require('./database/mongo');
const {getAllData, insertData, deleteData, updateData, getUserData} = require('./database/crud');
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
app.get('/:id', async(req,res) => {
    // console.log("GET called!!");
    let data = await getUserData(req.params.id);
    // console.log(data);
    res.send(data);
});
app.get('/', async(req,res) => {
    // console.log("GET called!!");
    let data = await getAllData();
    // console.log(data);
    res.send(data);
});
// endpoint to add a user
app.post('/', async(req, res) => {
    // console.log("POST called!!");
    await insertData(req.body);
    res.send({message: "New user added"});
});

// endpoint to delete a user
app.delete('/:id', async(req, res) => {
    await deleteData(req.params.id);
    res.send({message: "User deleted"}); 
});

app.put('/:id', async(req, res) => {
    await updateData(req.params.id, req.body);
    res.send({message : "User updated"});
});

// start the MongoDB instance
startDatabase().then(async() =>{

    // start the server
    app.listen(PORT, async() => {
        console.log('Listening on port ', PORT);
    });
});

