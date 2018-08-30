//importing modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
var port = 7000;
const url = 'mongodb://stockPingApp:rishi0neha0dev@ds235352.mlab.com:35352/stock-ping-db';
const app = express();

//middleware to parse data
//important as the POST request body will be undefined if not initialized as below
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const route = require('./routes/route');

//connect to mongodb (mLab)
mongoose.connect(url, { useNewUrlParser: true });

//mongodb event messages
mongoose.connection.on('connected', function () {
    console.log('---connected to mLab (DB)---');
});
mongoose.connection.on('error', function (err) {
    if (err) { throw err; }    
});

//specify route for REST api
app.use('/api', route);

//static files
app.use(express.static(path.join(__dirname, 'public')));

//testing
// app.get('/', function (req, res) {
//     res.sendFile(path.join(__dirname,'/index.html'));
// });

app.listen(port, function () { 
    console.log(`---Server running on ${port}---`);
})