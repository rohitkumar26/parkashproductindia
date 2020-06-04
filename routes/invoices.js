var express = require('express')
var router = express.Router()
const mongoose = require('mongoose');
const Invoice = require('../models/invoice');
const Client = require('../models/clients');



router.get('/', async (req, res) => {
    const result = await Invoice.find({}).populate('client').exec();
    res.status(200).json(result);
})

router.post('/', async (req, res) => {
    const newinvoice = req.body;

    try {

        let result = new Invoice(newinvoice);
        result = await result.save();
        res.status(200).json(result);
    }
    catch (err) {
        console.log(err);
    }
})
router.post('/modifiedInvoice', async (req, res) => {

    let invoiceid = req.body.invoiceid;
    let cgst = req.body.cgst;
    let sgst = req.body.sgst;
    let client = req.body.client;
    let items = req.body.items;
    let id = req.body.id;



    const newinvoice = { invoiceid, cgst, sgst, client, items };


    try {
        let updatedinvoice = await Invoice.updateOne({ _id: id }, { $set: newinvoice });
        res.json(updatedinvoice)
    }
    catch (err) {
        console.log(err);
    }

})
router.get('/delete/:id', async (req, res) => {

    try {
        console.log(req.params.id);
        let result = await Invoice.deleteOne({ _id: req.params.id });
        console.log(result);
        res.send(result);


    }
    catch (err) {
        console.log(err);
    }
})

router.get('/invoicepage', async (req, res) => {
    let clients = await Client.find({}, { name: 1 }).exec();

    res.render('enterinvoice', { clients })
})



module.exports = router;