const express = require("express");
const router = express.Router();

const product = require("../../controllers/admin/ProductController");
// const jwtMiddleware = require("../../middlewares/jwtMiddleware");

const upload = require("../../middlewares/UploadImgMiddlewares");


router.get("/list", product.lists);

router.get("/list/categories", product.getListCategory);


router.get("/detail/:id", product.detail);

router.post(
    "/upload",
    upload.single("image"),
    product.uploadImage
);

router.post("/create", product.create);
router.post("/delete", product.delete);

router.post("/update", product.update);

module.exports = router;
