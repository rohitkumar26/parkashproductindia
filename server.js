const express = require('express');
const app = express();
const mongoose = require('mongoose');
const ejs = require('ejs');
const process = require('process');
var expressLayouts = require('express-ejs-layouts');
var clientroute = require('./routes/clients');
var invoiceroute = require('./routes/invoices');
var clientpaymentroute = require('./routes/clientpayment');




app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded()) //for parsing form data in request.
app.set('view engine', 'ejs');
app.use(expressLayouts);

app.use('/clients', clientroute);
app.use('/invoices', invoiceroute);
app.use('/clientpayment', clientpaymentroute);

//connecting mongodb
mongoose.connect(process.env.MONGODBURI || 'mongodb://localhost:27017/rkppindia', { useNewUrlParser: true, useUnifiedTopology: true }).
    then(res => console.log("Database connected..."))
    .catch(error => handleError(error));

app.get('/', (req, res) => {
    res.redirect('invoices/invoicepage');
})

const host = '0.0.0.0';
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))