const express = require('express');
const app = express();
const mongoose = require('mongoose');
const ejs = require('ejs');
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
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/rkppindia', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(res => console.log("Database connected..."))
    .catch(error => handleError(error));

app.get('/', (req, res) => {
    res.redirect('invoices/invoicepage');
})


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));