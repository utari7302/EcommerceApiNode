const stripe = require("stripe")(process.env.STRIPE_KEY);
const { success, error, validation } = require("./../response/responseApi");

const payment = async (req, res) => {
    stripe.charges.create({
        source: req.body.tokenId,
        amount:req.body.amount,
        currency: "usd"
    },(stripeErr,stripeRes)=>{
        if(stripeErr){
            res.status(500).json(error(stripeErr,500));
        }else{
            res.status(200).json(success(stripeRes,stripeRes,200));
        }
    });
}

module.exports = { payment }