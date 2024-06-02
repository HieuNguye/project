const express = require("express");
const router = express.Router();

const orderdetail = require("../../controllers/admin/OrderDetailController");



router.get("/list/:id", orderdetail.lists);
router.get("/detail/:id", orderdetail.detail);

router.post("/delete", orderdetail.delete);


module.exports = router;
