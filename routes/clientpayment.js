var express = require('express')
var router = express.Router()
const mongoose = require('mongoose');

//my models
var ClientPayment = require('../models/clientpayment');
const Client = require('../models/clients');
//npm module moment
const moment = require('moment');
//middleware
const { typecheckingpayment, datequerystr } = require('../middleware/clientpayment');

router.get('/', async (req, res) => {
    req.query.type = 'debit';
    try {
        const result = await ClientPayment.find(req.query).sort({ date: -1 }).populate('client').exec();
        const clients = await Client.find({}, { name: 1 }).exec();
        res.render('showclientpayments', { result, clients })
    }
    catch (err) {
        res.send(err);
    }
})

router.post('/', typecheckingpayment, async (req, res) => {
    try {
        const newpayment = new ClientPayment(req.body.newpayment);
        const result = await newpayment.save();
        res.redirect('/clientpayment');
    }
    catch (err) {
        console.log(err);
        res.send(err);
    }
})
router.post('/modifiedclientpayment', typecheckingpayment, async (req, res) => {
    try {
        let mpayment = await ClientPayment.updateOne({ _id: req.body.id }, { $set: req.body.newpayment }, { new: true });
        res.redirect('/clientpayment');
    }
    catch (err) {
        res.send(err);
    }
})
router.get('/delete/:id', async (req, res) => {
    try {
        const result = await ClientPayment.deleteOne({ _id: req.params.id });
        res.redirect('/clientpayment')
    }
    catch (err) {
        res.send(err);
    }
})
router.get('/enterpayment', async (req, res) => {
    try {
        const clients = await Client.find({}, { name: 1 }).exec();
        res.render('enterclientpayment', { clients });
    }
    catch (err) {
        res.send(err);
    }
})
router.get('/editclientpayment/:id', async (req, res) => {
    try {
        const result = await ClientPayment.findOne({ _id: req.params.id }).exec();
        const clients = await Client.find({}, { name: 1 }).exec();
        const newdate = moment(result.date).format('YYYY-MM-DD');
        res.render('editclientpayment', { result, clients, newdate });
    }
    catch (err) {
        res.send(err);
    }
})

router.get('/ledger', datequerystr, async (req, res) => {
    try {
        let clientflag = 0;
        const clients = await Client.find({}, { name: 1 }).exec();
        if (typeof req.query.client == 'undefined') {
            res.render('clientledger', { clientflag, clients });
        }
        if (typeof req.query.client !== 'undefined') {
            const result = await ClientPayment.find(req.query.newquery).sort({ date: 1 }).exec();
            clientflag = 1;
            let clientid = req.query.client;
            let clientresult = await Client.findOne({ _id: clientid }, { name: 1 }).exec();
            res.render('clientledger', {
                clients, result, clientflag, clientid, clientname: clientresult.name
            })
        }
    }
    catch (err) {
        res.send(err);
    }
})
module.exports = router;
