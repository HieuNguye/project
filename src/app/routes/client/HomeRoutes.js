const express = require("express");
const router = express.Router();

const home = require("../../controllers/client/HomeController");
router.get("/list", home.listNew);

router.get("/list/categories", home.getListCategory);
router.get("/list/categorieshang", home.getListCategoryHang);

module.exports = router;








