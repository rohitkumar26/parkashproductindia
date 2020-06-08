var express = require('express')
var router = express.Router()
const mongoose = require('mongoose');
const Invoice = require('../models/invoice');
const Client = require('../models/clients');
const moment = require('moment');
router.get('/', async (req, res) => {
    const result = await Invoice.find({}).sort({ invoiceid: -1 }).populate('client').exec();

    res.render('showinvoices', { result });
})
router.post('/', async (req, res) => {
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
        result = await result.save();
        // res.status(200).json(result);
        res.redirect('/invoices');
    }
    catch (err) {
        console.log(err);
        res.send(err);
    }
})
router.post('/modifiedInvoice', async (req, res) => {
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
    try {
        let updatedinvoice = await Invoice.updateOne({ _id: id }, { $set: newinvoice }, { new: true });
        res.redirect('/invoices');
    }
    catch (err) {
        console.log(err);
        res.send(err);
    }
})
router.get('/delete/:id', async (req, res) => {
    try {
        let result = await Invoice.deleteOne({ _id: req.params.id });
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
        console.log(err);
        res.send(err);
    }
})
router.get('/invoicepage', async (req, res) => {
    try {
        let clients = await Client.find({}, { name: 1 }).exec();
        res.render('enterinvoice', { clients })
    }
    catch (err) {
        console.log(err);
        res.send(err);
    }
})

router.get('/detailedinvoice/:id', async (req, res) => {
    const result = await Invoice.findOne({ _id: req.params.id }).populate('client').exec();

    res.render('detailedinvoice', { result });
})
module.exports = router;