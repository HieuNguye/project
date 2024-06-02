const express = require("express");
const router = express.Router();

const ordernhap = require("../../controllers/admin/OrderNhapController");

router.get("/list", ordernhap.lists);
router.get("/detail/:id", ordernhap.detail);


router.post("/create", ordernhap.create);
router.post("/delete", ordernhap.delete);
router.post("/update", ordernhap.update);

module.exports = router;
