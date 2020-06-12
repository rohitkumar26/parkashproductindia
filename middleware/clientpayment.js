const typecheckingpayment = (req, res, next) => {
    const date = new Date(req.body.date);
    const payment = Number(req.body.payment);
    const client = req.body.client;
    const chequeno = req.body.chequeno;
    let newpayment = { date, payment, chequeno, client }
    req.body.newpayment = newpayment;
    next();
}

const datequerystr = (req, res, next) => {
    if (req.query.startdate == '0' || req.query.enddate == '0') {
        let newquery = { client: req.query.client };
        req.query.newquery = newquery;
        next();
    }
    else {
        req.query.date = { $gte: req.query.startdate, $lte: req.query.enddate };
        let newquery = { client: req.query.client, date: req.query.date };
        req.query.newquery = newquery;
        next();
    }
}
module.exports = {
    typecheckingpayment, datequerystr
}
