const express = require("express");
const router = express.Router();

const cate = require("../../controllers/client/CategoryController");


router.get("/list/products/:id", cate.listPrdtOfCate);
// router.get("/same/products/:id", detail.listSame);


module.exports = router;
