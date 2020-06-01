var mongoose = require('mongoose');

const invoiceschema = new mongoose.Schema({
    invoiceId: { type: String, required: true, lowercase: true, unique: true, trim: true },
    date: { type: Date, required: true, default: Date.now() },

})