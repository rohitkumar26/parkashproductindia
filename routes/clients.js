var express = require('express')
var router = express.Router()
const mongoose = require('mongoose');
const Client = require('../models/clients');

router.get('/', async (req, res) => {
    try {
        let result = await Client.find(req.query);
        res.render('getclientdata', {
            result
        })
    }
    catch (err) {
        res.send(err);
    }
})
router.post('/', async (req, res) => {
    try {
        const newClient = new Client(req.body)
        const result = await newClient.save();
        res.render('success', {
            result
        })
    }
    catch (err) {

        res.send("A ERROR OCCURED....\n" + err);
    }
})
router.post('/modifiedclient', async (req, res) => {
    try {
        let id = req.body.id;
        let result = await Client.updateOne({ _id: id }, { $set: req.body });
        res.redirect('/clients');
    }
    catch (err) {
        console.log(err);
    }
})
router.get('/delete/:id', async (req, res) => {
    try {
        let result = await Client.deleteOne({ _id: req.params.id });
        res.redirect('/clients');
    }
    catch (err) {
        res.send(err);
    }
})
router.get('/editclient/:id', async (req, res) => {
    try {
        let id = req.params.id;
        let result = await Client.find({ _id: id });
        res.render('editclient', {
            result: result[0]
        })
    }
    catch (err) {
        res.send(err);
    }
})
router.get('/clienthomepage', (req, res) => {
    res.render('enterclient');
})
module.exports = router