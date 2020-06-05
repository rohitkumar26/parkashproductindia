var express = require('express')
var router = express.Router()
const mongoose = require('mongoose');
const Client = require('../models/clients');


router.get('/', async (req, res) => {
    try {
        let result = await Client.find();
        // console.log(result);

        // res.json(result);
        res.render('getclientdata', {
            result
        })
    }
    catch (err) {
        res.send(err);
    }
})

router.post('/', async (req, res) => {
    let name = req.body.name;
    let address = req.body.address;
    let statecode = req.body.statecode;
    let gstin = req.body.gstin;
    let state = req.body.state;
    try {
        const newClient = new Client({
            name, address, gstin, state, statecode
        })
        const result = await newClient.save();
        console.log(result);
        //res.json(result);
        res.render('success', {
            result
        })
    }
    catch (err) {
        console.log(err);
        res.send("A ERROR OCCURED....\n" + err);
    }

})
router.post('/modifiedclient', async (req, res) => {
    try {
        let name = req.body.name;
        let address = req.body.address;
        let statecode = req.body.statecode;
        let gstin = req.body.gstin;
        let state = req.body.state;
        let id = req.body.id;
        let updatedoc = { name: name, address: address, gstin: gstin, state: state, statecode: statecode };

        console.log(id);
        let result = await Client.updateOne({ _id: id }, { $set: updatedoc });
        result.success = "modified succesfully";
        res.redirect('/clients');

        console.log(result);
    }
    catch (err) {
        console.log(err);
    }
})
router.get('/delete/:id', async (req, res) => {

    try {
        console.log(req.params.id);
        let result = await Client.deleteOne({ _id: req.params.id });
        console.log(result);
        res.redirect('/clients');


    }
    catch (err) {
        console.log(err);
    }
})

router.get('/editclient/:id', async (req, res) => {
    try {
        let id = req.params.id;
        let result = await Client.find({ _id: id });
        console.log(result);
        res.render('editclient', {
            result: result[0]
        })
    }
    catch (err) {
        console.log(err);
    }

})
router.get('/clienthomepage', (req, res) => {
    res.render('enterclient');
})

module.exports = router