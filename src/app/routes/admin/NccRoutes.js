const express = require("express");
const router = express.Router();

const ncc = require("../../controllers/admin/NccController");
// const jwtMiddleware = require("../../middlewares/jwtMiddleware");

const upload = require("../../middlewares/UploadImgMiddlewares");


router.get("/list", ncc.lists);

router.get("/list/categories", ncc.getListCategory);


router.get("/detail/:id", ncc.detail);

router.post(
    "/upload",
    upload.single("image"), 
    ncc.uploadImage
);

router.post("/create", ncc.create);
router.post("/delete", ncc.delete);

router.post("/update", ncc.update);

module.exports = router;
