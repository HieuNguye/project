const express = require("express");
const router = express.Router();

const nguoidung = require("../../controllers/client/AccountController");

router.post("/register", nguoidung.register);
router.post("/login", nguoidung.login);
router.post("/logout", nguoidung.logout);

router.get("/get-user", nguoidung.getUserSession);
router.get("/get-customer/:id", nguoidung.getCustomer);


router.post("/authen", nguoidung.authen);
router.get("/getUser", nguoidung.getUser);

module.exports = router;