let totalpayment = (req, res, next) => {
    let itemstotals = req.body.items.map(el => {
        return Number(el.price) * Number(el.quantity);
    })
    let itemtotal = itemstotals.reduce((total, val) => total + val);
    let grandtotal = itemtotal + Math.round((itemtotal * Number(req.body.gst) / 100));
    req.body.grandtotal = grandtotal;
    req.body.paymenttype = 'credit';

    next();
}


module.exports = {
    totalpayment,

}