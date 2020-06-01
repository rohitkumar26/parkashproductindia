const express = require('express');
const app = express();
const mongoose = require('mongoose');
const ejs = require('ejs');
var expressLayouts = require('express-ejs-layouts');
var clientroute = require('./routes/clients');




app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded()) //for parsing form data in request.
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use('/clients', clientroute);

//connecting mongodb
mongoose.connect('mongodb://localhost:27017/rkppindia', { useNewUrlParser: true, useUnifiedTopology: true }).
    then(res => console.log("Database connected..."))
    .catch(error => handleError(error));

app.get('/', (req, res) => {
    res.render('index');
})

const port = 3000;
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))