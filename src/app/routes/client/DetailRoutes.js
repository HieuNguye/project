const express = require("express");
const router = express.Router();

const detail = require("../../controllers/client/DetailController");
// const jwtMiddleware = require("../../middlewares/jwtMiddleware");

// const upload = require("../../middlewares/uploadImgMiddleware");


router.get("/detail/:id", detail.detail);
router.get("/same/products/:id", detail.listSame);


module.exports = router;
