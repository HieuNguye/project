const express = require("express");
const router = express.Router();

const employee = require("../../controllers/admin/EmployeeController");
// const jwtMiddleware = require("../../middlewares/jwtMiddleware");

const upload = require("../../middlewares/UploadImgMiddlewares");


router.get("/list", employee.lists);
router.get("/list/categories", employee.getListCategory);
router.get("/detail/:id", employee.detail);

router.post(
    "/upload",
    upload.single("image"), 
    employee.uploadImage
);

router.post("/create", employee.create);
router.post("/delete", employee.delete);

router.post("/update", employee.update);

module.exports = router;
