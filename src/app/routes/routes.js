const express = require("express");
const router = express.Router();

const authenticate = require("../middlewares/authMiddleware");

// admin
const product = require("./admin/ProductRoutes");
const adminCategory = require("./admin/CategoryRoutes");
const ncc = require("./admin/NccRoutes");
const employee = require("./admin/EmployeeRoutes");
const customer = require("./admin/CustomerRoutes");
const order = require("./admin/OrderRoutes");
const orderdetail = require("./admin/OrderDetailRoutes");
const ordernhap = require("./admin/OrderNhapRoutes")


router.use("/admin/product", product);
router.use("/admin/category", adminCategory);
router.use("/admin/ncc", ncc);
router.use("/admin/employee", employee);
router.use("/admin/customer", customer);
router.use("/admin/order", order);
router.use("/admin/orderdetail", orderdetail);
router.use("/admin/ordernhap", ordernhap)

// client
const home = require("./client/HomeRoutes")
const detail = require("./client/DetailRoutes")
const category = require("./client/CategoryRoutes")
const cart = require("./client/CartRoutes")
const payment = require("./client/PaymentRoutes")
const account = require("./client/AccountRoutes");

router.use("/product/home", home);
router.use("/product", detail);
router.use("/category", category);
router.use("/cart", cart);
router.use("/payment", payment);
router.use("/account", account);

module.exports = router;
