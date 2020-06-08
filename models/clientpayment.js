var mongoose = require('mongoose');

const clientPaymentSchema = new mongoose.Schema({
    date: { type: Date, default: Date.now },
    payment: { type: Number, required: true },
    type: { type: String, enum: ['debit', 'credit'], default: "debit" },
    client: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'client' }

});

const ClientPayment = new mongoose.model('clientpayment', clientPaymentSchema, 'clientpayments');

module.exports = ClientPayment;