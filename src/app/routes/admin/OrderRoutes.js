const express = require("express");
const router = express.Router();

const order = require("../../controllers/admin/OrderController");

const upload = require("../../middlewares/UploadImgMiddlewares");


router.get("/list", order.lists);
router.get("/detail/:id", order.detail);

router.post(
    "/upload",
    upload.single("image"), 
    order.uploadImage
);


router.post("/delete", order.delete);


module.exports = router;
