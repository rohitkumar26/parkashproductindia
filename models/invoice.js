var mongoose = require('mongoose');

const invoiceschema = new mongoose.Schema({
    invoiceid: { type: Number, required: true, lowercase: true, unique: true, trim: true },
    date: { type: Date, default: Date.now() },
    cgst: { type: Number, required: true },
    sgst: { type: Number, required: true },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'client'
    },
    items: [{
        name: { type: String, required: true },
        price: { type: Number, required: true },
        hsncode: { type: Number },
        quantity: { type: Number }
    }]

})
const Invoice = mongoose.model('invoice', invoiceschema, 'invoices');

module.exports = Invoice;