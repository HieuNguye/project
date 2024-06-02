const express = require("express");
const router = express.Router();

const customer = require("../../controllers/admin/CustomerController");
// const jwtMiddleware = require("../../middlewares/jwtMiddleware");

const upload = require("../../middlewares/UploadImgMiddlewares");


router.get("/list", customer.lists);
router.get("/list/categories", customer.getListCategory);
router.get("/detail/:id", customer.detail);

router.post(
    "/upload",
    upload.single("image"), 
    customer.uploadImage
);

router.post("/create", customer.create);
router.post("/delete", customer.delete);

router.post("/update", customer.update);

module.exports = router;
