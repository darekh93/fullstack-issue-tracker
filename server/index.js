const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const apiRoutes = require("./routes/index.js");

require('dotenv').config({ path: 'variables.env' });

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cors());
app.options('*', cors());

mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;

if(!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")

app.get('/', (req, res) => res.send('Hello World with Express'));
app.use('/api', apiRoutes);

app.use(function (req, res, next) {
    res.status(404).json({
        message: "Sorry can't find that"
    })
})

var port = process.env.PORT || 8080;

var server = app.listen(port, function () {
    console.log("Running Server on port " + port);
});

module.exports = server;