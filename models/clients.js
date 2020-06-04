const mongoose = require('mongoose');

//creating clients schema
const schema = mongoose.Schema;
const clients = new schema({
    name: { type: String, required: true, lowercase: true },
    address: { type: String, required: true, lowercase: true },
    statecode: { type: String, required: true, lowercase: true },
    gstin: { type: String, required: true, unique: true, trim: true, lowercase: true },
    state: { type: String, required: true, lowercase: true }
});

const Client = mongoose.model('client', clients, 'clients');

module.exports = Client;