const router = require("express");
const auth = require("./../middlewares/auth");
const { payment } = require("./../controller/stripeController");

const stripeRouter = router.Router();

stripeRouter.post("/payment", auth,payment)

module.exports = stripeRouter;