var express = require('express')
var router = express.Router()
const mongoose = require('mongoose');
var ClientPayment = require('../models/clientpayment');
const Client = require('../models/clients');


router.get('/', async (req, res) => {
    const result = await ClientPayment.find({}).exec();
    res.send(result);

})
const typecheckingpayment = (req, res, next) => {
    const date = new Date(req.body.date);
    const payment = Number(req.body.payment);
    const client = req.body.client;
    const type = req.body.type;
    let newpayment = { date, payment, type, client }
    req.body.newpayment = newpayment;
    next();
}
router.post('/', typecheckingpayment, async (req, res) => {
    try {
        const newpayment = new ClientPayment(req.body.newpayment);
        const result = await newpayment.save();
        res.send(result);
    }
    catch (err) {
        console.log(err);
        res.send(err);
    }
})
router.get('/modifiedclientpayment', typecheckingpayment, async (req, res) => {
    try {
        let mpayment = await ClientPayment.updateOne({ _id: req.body.id }, { $set: req.body.newpayment }, { new: true });
        res.send(mpayment);
    }
    catch (err) {
        res.send(err);
    }
})
router.get('/delete/:id', async (req, res) => {
    try {
        const result = await ClientPayment.deleteOne({ _id: req.params.id });
        res.send(result);
    }
    catch (err) {
        res.send(err);
    }
})
module.exports = router;
