const express = require("express");
const router = express.Router();

const cart = require("../../controllers/client/CartController");

router.get("/product/list", cart.showCart);

router.post("/product/addCart", cart.addCart);

router.post("/product/delete", cart.deleteItem);

router.get("/product/totalmoney", cart.totalMoney);


module.exports = router;
