const express = require("express");
const router = express.Router();

const payment = require("../../controllers/client/PaymentController");

router.post("/payment", payment.payment);
router.post("/payment/vnpay", payment.paymenVNPay);

module.exports = router;
