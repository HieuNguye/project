const express = require("express");
const router = express.Router();

const category = require("../../controllers/admin/CategoryController");
// const jwtMiddleware = require("../../middlewares/jwtMiddleware");

const upload = require("../../middlewares/UploadImgMiddlewares");


router.get("/list", category.lists);

router.get("/list/categories", category.getListCategory);


router.get("/detail/:id", category.detail);

router.post(
    "/upload",
    upload.single("image"),
    category.uploadImage
);

router.post("/create", category.create);
router.post("/delete", category.delete);

router.post("/update", category.update);

module.exports = router;
