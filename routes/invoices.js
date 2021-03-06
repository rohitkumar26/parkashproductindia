var express = require('express')
var router = express.Router()
const mongoose = require('mongoose');
//mymodels
const Invoice = require('../models/invoice');
const Client = require('../models/clients');
const ClientPayment = require('../models/clientpayment');
//middleware
const { totalpayment } = require('../middleware/invoice');
//helpers
const moment = require('moment');
var json2xls = require('json2xls');
router.use(json2xls.middleware);
//my global route variable
let excelresult;

router.get('/', async (req, res) => {

    const result = await Invoice.find(req.query).sort({ invoiceid: -1 }).populate('client').exec();

    excelresult = result;
    res.render('showinvoices', { result });
})

router.post('/', totalpayment, async (req, res) => {
    let invoiceid = Number(req.body.invoiceid);
    let date = new Date(req.body.date);
    let client = req.body.clients;
    let gst = Number(req.body.gst);
    let items = req.body.items.map(el => {
        return {
            name: el.name,
            price: Number(el.price),
            quantity: Number(el.quantity)
        }
    })
    const newinvoice = { invoiceid, date, client, items, gst };
    try {
        let result = await new Invoice(newinvoice);
        let newclientpayment = await new ClientPayment({
            date: date,
            payment: req.body.grandtotal,
            type: req.body.paymenttype,
            client: client,
            chequeno: `invoice no : ${invoiceid}`,
            invoiceid: invoiceid
        })

        result = await result.save();
        newclientpayment = await newclientpayment.save();
        // res.status(200).json(result);
        res.redirect('/invoices');
    }
    catch (err) {
        console.log(err);
        res.send(err);
    }
})
router.post('/modifiedInvoice', totalpayment, async (req, res) => {
    let invoiceid = Number(req.body.invoiceid);
    let date = new Date(req.body.newdate);
    let client = req.body.clients;
    let gst = Number(req.body.gst);
    let id = req.body.id;
    let items = req.body.items.map(el => {
        return {
            name: el.name,
            price: Number(el.price),
            quantity: Number(el.quantity)
        }
    })
    const newinvoice = { invoiceid, date, gst, client, items };
    const updatedclientpayment = {
        date: date,
        payment: req.body.grandtotal,
        type: req.body.paymenttype,
        client: client,
        chequeno: `invoice no : ${invoiceid}`,
        invoiceid: invoiceid
    }
    try {
        let updatedinvoice = await Invoice.updateOne({ _id: id }, { $set: newinvoice }, { new: true });
        let updateclientpayment = await ClientPayment.updateOne({ invoiceid: invoiceid }, { $set: updatedclientpayment }, { new: true, upsert: true });
        res.redirect('/invoices');
    }
    catch (err) {
        console.log(err);
        res.send(err);
    }
})
router.get('/delete/:id', async (req, res) => {
    try {
        const getclientid = await Invoice.findOne({ _id: req.params.id }).populate('client').exec();
        let result = await Invoice.deleteOne({ _id: req.params.id });
        let deleteclientpayment = await ClientPayment.deleteOne({ invoiceid: getclientid.invoiceid });
        res.redirect('/invoices')
    }
    catch (err) {
        console.log(err);
        res.send(err);
    }
})
router.get('/editinvoice/:id', async (req, res) => {
    try {
        let clients = await Client.find({}, { name: 1 }).exec();
        const result = await Invoice.findOne({ _id: req.params.id }).exec();
        const newdate = moment(result.date).format('YYYY-MM-DD');
        res.render('editinvoice', {
            result, clients, newdate
        })
    }
    catch (err) {

        res.send(err);
    }
})
router.get('/invoicepage', async (req, res) => {
    try {
        let clients = await Client.find({}, { name: 1 }).exec();
        let lastinvoiceid = await Invoice.findOne({}, { invoiceid: 1 }).sort({ invoiceid: -1 }).exec();
        res.render('enterinvoice', { clients, lastinvoiceid: lastinvoiceid.invoiceid })
    }
    catch (err) {

        res.send(err);
    }
})

router.get('/detailedinvoice/:id', async (req, res) => {
    const result = await Invoice.findOne({ _id: req.params.id }).populate('client').exec();

    res.render('detailedinvoice', { result });
})

router.get('/downloadexcel', async function (req, res) {

    // const result = await Invoice.find(req.query).sort({ invoiceid: -1 }).populate({ path: 'client', select: 'name' }).exec();
    const result = excelresult;
    let finalresult = [];
    result.forEach(el => {
        let itemstotals = el.items.map(el => {
            return Number(el.price) * Number(el.quantity);
        })
        let itemtotal = itemstotals.reduce((total, val) => total + val);
        let grandtotal = itemtotal + Math.round((itemtotal * Number(el.gst) / 100));
        finalresult = [...finalresult, {
            invoiceid: el.invoiceid,
            date: el.date.toDateString(),
            name: el.client.name,
            totalpayment: grandtotal
        }]
    })



    res.xls('data.xlsx', finalresult);
});

module.exports = router;